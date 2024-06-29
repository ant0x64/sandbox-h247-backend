import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const enableSwagger = (app: INestApplication): void => {
  SwaggerModule.setup(
    'doc',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addServer('/')
        .addBearerAuth({
          bearerFormat: 'JWT',
          type: 'http',
        })
        .setTitle('Flat of Things')
        .build(),
    ),
  );
};
