import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ConfigDocumentBuilder, DEFAULT_PORT, GLOBAL_PREFIX } from './app/app.const';
import { AppModule } from './app/app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(ConfigDocumentBuilder.TITLE)
    .setDescription(ConfigDocumentBuilder.DESCRIPTION)
    .setVersion(ConfigDocumentBuilder.VERSION)
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
