import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Thing } from './entities/thing.entity';
import { Model } from 'mongoose';
import { Attach } from './entities/attach.entity';
import { ThingDto } from './dto/thing.dto';
import { LoadDto } from './dto/load.dto';
import { AttachDto } from './dto/attach.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Thing.name) private thingModel: Model<Thing>,
    @InjectModel(Attach.name) private attachModel: Model<Attach>,
  ) {}

  async loadState(): Promise<LoadDto> {
    return {
      things: await this.thingModel.find().exec(),
      attaches: (await this.attachModel.find().exec()).map((attach) => {
        return {
          thingId: attach.thing._id.toString(),
          containerId: attach.container._id.toString(),
        };
      }),
    };
  }

  async createThing(thingDto: ThingDto): Promise<ThingDto> {
    const thing = await this.thingModel.create(thingDto);
    return { ...thingDto, id: thing._id.toString() };
  }

  async attachThing(attachDto: AttachDto): Promise<AttachDto> {
    this.validateAttachDto(attachDto);

    await this.attachModel
      .create({
        thing: attachDto.thingId,
        container: attachDto.containerId,
      })
      .catch(() => {
        throw new ConflictException('Element already attached');
      });

    return attachDto;
  }

  protected async validateAttachDto(attachDto: AttachDto) {
    const [element, container] = (
      await this.thingModel
        .find({
          _id: { $in: Object.values(attachDto) },
        })
        .exec()
    ).sort((a) => (a._id.toString() === attachDto.thingId ? -1 : 1));

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
