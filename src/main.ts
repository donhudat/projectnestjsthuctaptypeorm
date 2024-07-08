import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  const config = new DocumentBuilder()
    .setTitle('Blog APIs')
    .setDescription('Blog API Documentation')
    .setVersion('1.0')
    .addTag('Article')
    .addTag('User')
    .addTag('Auth')
    .addTag('Note')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
