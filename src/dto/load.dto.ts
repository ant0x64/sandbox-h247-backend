import { ApiProperty } from '@nestjs/swagger';
import { ThingDto } from './thing.dto';
import { AttachDto } from './attach.dto';

export class LoadDto {
  @ApiProperty({ type: [ThingDto] })
  things: ThingDto[];

  @ApiProperty({ type: [AttachDto] })
  attaches: AttachDto[];
}
