import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  ConfigModule.forRoot({ isGlobal: true });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      strictGroups: true,
    }),
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
