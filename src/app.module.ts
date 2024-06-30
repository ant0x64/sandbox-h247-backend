import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

import { Thing, ThingSchema } from './entities/thing.entity';
import { Attach, AttachSchema } from './entities/attach.entity';

@Module({
  controllers: [AppController, AuthController],
  imports: [
    AuthModule,
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
