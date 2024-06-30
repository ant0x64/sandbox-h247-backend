import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from './modules/auth/auth.guard';

import { AppService } from './app.service';

import { LoadDto } from './dto/load.dto';
import { ThingDto } from './dto/thing.dto';
import { AttachDto } from './dto/attach.dto';

@Controller()
@UseGuards(AuthGuard)
@ApiBearerAuth()
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
  @ApiResponse({ type: ThingDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: ThingDto })
  create(@Body() thingDto: ThingDto): Promise<ThingDto> {
    return this.appService.createThing(thingDto);
  }

  @Post('attach')
  @ApiOperation({ summary: 'Attach Thing' })
  @ApiResponse({ type: AttachDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiBody({ type: AttachDto })
  attach(@Body() attachDto: AttachDto): Promise<AttachDto> {
    return this.appService.attachThing(attachDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: 'Delete Thing' })
  delete(@Param('id') id: string): Promise<void> {
    return this.appService.deleteThing(id);
  }
}
