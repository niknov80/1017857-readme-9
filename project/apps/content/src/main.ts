/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigDocumentBuilder, GLOBAL_PREFIX } from './app/app.const';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(ConfigDocumentBuilder.TITLE)
    .setDescription(ConfigDocumentBuilder.DESCRIPTION)
    .setVersion(ConfigDocumentBuilder.VERSION)
    .build();

  const globalPrefix = GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(`🚀 Application "Content" is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
