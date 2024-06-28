import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoadDto } from './dto/load.dto';
import { ThingDto } from './dto/thing.dto';
import { AttachDto } from './dto/attach.dto';
import { AuthGuard } from './modules/auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('load')
  @ApiOperation({ summary: 'Load App State' })
  @ApiResponse({
    type: LoadDto,
  })
  load(): Promise<LoadDto> {
    return this.appService.load();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create Thing' })
  @ApiBody({ type: ThingDto })
  create(@Body() thingDto: ThingDto): Promise<ThingDto> {
    return this.appService.createThing(thingDto);
  }

  @Post('attach')
  @ApiOperation({ summary: 'Attach Thing' })
  @ApiBody({ type: AttachDto })
  attach(@Body() attachDto: AttachDto): Promise<AttachDto> {
    return this.appService.attachThing(attachDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete Thing' })
  delete(@Param('id') id: string): Promise<void> {
    return this.appService.deleteThing(id);
  }
}
