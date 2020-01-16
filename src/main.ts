import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import passport = require('passport');
import { checklogs } from './common/middleware/test.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(checklogs);
  const options = new DocumentBuilder()
    .setTitle('Api')
    .setDescription('Api for Task Management')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);
  await app.listen(3000);
}
bootstrap();
