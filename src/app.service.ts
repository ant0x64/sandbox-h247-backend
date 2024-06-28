import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Thing } from './entities/thing.entity';
import { Attach } from './entities/attach.entity';

import { ThingDto } from './dto/thing.dto';
import { LoadDto } from './dto/load.dto';
import { AttachDto } from './dto/attach.dto';

/**
 * @todo: Implement a custom DTO serializer to trim extra data (Mongoose is not supported in Nest core).
 */

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Thing.name) private thingModel: Model<Thing>,
    @InjectModel(Attach.name) private attachModel: Model<Attach>,
  ) {}

  async load(): Promise<LoadDto> {
    return {
      things: await this.thingModel.find().exec(),
      attaches: await this.attachModel.find().exec(),
    };
  }

  async createThing(thingDto: ThingDto): Promise<ThingDto> {
    const thing = await this.thingModel.create(thingDto);
    return { ...thingDto, id: thing._id.toString() };
  }

  async attachThing(attachDto: AttachDto): Promise<AttachDto> {
    await this.validateAttachDto(attachDto);

    return await this.attachModel
      .findOneAndUpdate(
        { thing: attachDto.thing },
        {
          thing: attachDto.thing,
          container: attachDto.container,
        },
        { new: true, upsert: true },
      )
      .catch(() => {
        throw new ConflictException('Element already attached');
      });
  }

  async deleteThing(id: ThingDto['id']): Promise<void> {
    if (!(await this.thingModel.findById(id).exec())) {
      throw new NotFoundException();
    }

    // const session = await this.connection.startSession();
    // session.startTransaction();

    await this.attachModel
      .deleteMany({
        $or: [
          {
            container: id,
          },
          {
            thing: id,
          },
        ],
      })
      .exec();

    await this.thingModel.deleteOne({ _id: id }).exec();
  }

  protected async validateAttachDto(attachDto: AttachDto) {
    const [element, container] = (
      await this.thingModel
        .find({
          _id: { $in: Object.values(attachDto) },
        })
        .exec()
    ).sort((a) => (a._id.toString() === attachDto.thing ? -1 : 1));

    if (!element || !container) {
      throw new NotFoundException("Thing doesn't exist");
    }

    if (container.type !== 'container') {
      throw new UnprocessableEntityException('Destination is not a Container');
    }

    const attachedIds = (
      await this.attachModel
        .find({
          container: container._id,
          thing: {
            $ne: attachDto.thing,
          },
        })
        .exec()
    ).map((attach) => attach.thing);

    const freeSize = (
      await this.thingModel.find({ _id: { $in: attachedIds } }).exec()
    ).reduce((res, thing) => {
      return res - thing.size;
    }, container.size);

    if (freeSize - element.size < 0) {
      throw new ConflictException("Container doesn't have free space");
    }
  }
}
