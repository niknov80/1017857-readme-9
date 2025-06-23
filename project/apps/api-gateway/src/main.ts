/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestIdInterceptor } from '@project/interceptors';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ConfigDocumentBuilder, GLOBAL_PREFIX } from './app/app.const';
import { AppModule } from './app/app.module';

dotenv.config({
  path: path.resolve(process.cwd(), 'apps/api-gateway/api-gateway.env'),
});

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

  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = configService.get('application.port');

  Logger.log(`📦 Loaded PORT from configService: ${port}`);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
