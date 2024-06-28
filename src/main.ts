import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppExceptionFilter } from './app.exception';

async function bootstrap() {
  ConfigModule.forRoot({ isGlobal: true });

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      strictGroups: true,
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  app.enableCors();

  app.listen(process.env.PORT || 4000);
}
bootstrap();
