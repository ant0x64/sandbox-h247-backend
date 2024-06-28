import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AttachDto {
  @IsNotEmpty()
  @ApiProperty()
  thingId: string;

  @IsNotEmpty()
  @ApiProperty()
  containerId: string | null;
}
