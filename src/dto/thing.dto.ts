import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { Thing, ThingTypeList } from 'src/entities/thing.entity';

export class ThingDto implements Omit<Thing, 'id'> {
  @IsOptional()
  @ApiProperty()
  id?: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  size: number;

  @IsEnum(ThingTypeList)
  type: ThingTypeList;
}
