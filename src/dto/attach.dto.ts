import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Attach } from 'src/entities/attach.entity';

export class AttachDto implements Attach {
  @IsNotEmpty()
  @ApiProperty()
  thing: string;

  @IsNotEmpty()
  @ApiProperty()
  container: string;
}
