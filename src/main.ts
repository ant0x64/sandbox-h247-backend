import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppExceptionFilter } from './app.exception';

import { enableSwagger } from './modules/swagger';

async function bootstrap() {
  ConfigModule.forRoot({ isGlobal: true });

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  app.enableCors();
  enableSwagger(app);

  app.listen(
    process.env.PORT || 4000,
    process.env.NODE_ENV === 'development' ? '0.0.0.0' : null,
  );
}
bootstrap();
