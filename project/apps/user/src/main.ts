import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  await app.listen(port);
  Logger.log(`🚀 Application "User" is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
