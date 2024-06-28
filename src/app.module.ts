import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import { Thing, ThingSchema } from './entities/thing.entity';
import { Attach, AttachSchema } from './entities/attach.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE),
    MongooseModule.forFeature([
      {
        name: Thing.name,
        schema: ThingSchema,
      },
      {
        name: Attach.name,
        schema: AttachSchema,
      },
    ]),
  ],
  providers: [AppService],
})
export class AppModule {}
