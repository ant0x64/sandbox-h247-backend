import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoadDto } from './dto/load.dto';
import { ThingDto } from './dto/thing.dto';
import { AttachDto } from './dto/attach.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('load')
  @ApiOperation({ summary: 'Load App State' })
  @ApiResponse({
    type: LoadDto,
  })
  load(): Promise<LoadDto> {
    return this.appService.loadState();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create Thing' })
  @ApiBody({ type: ThingDto })
  create(@Body() thingDto: ThingDto) {
    return this.appService.createThing(thingDto);
  }

  @Post('attach')
  @ApiOperation({ summary: 'Attach Thing' })
  @ApiBody({ type: AttachDto })
  attach(@Body() attachDto: AttachDto) {
    return this.appService.attachThing(attachDto);
  }
}
