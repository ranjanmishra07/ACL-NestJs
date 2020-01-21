import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PermissionService } from './users/services/permission.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Tasks Api')
  .setDescription('Api for Task Management')
  .setVersion('1.0')
  .addTag('tasks')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);
  app.listen(3000)
}
bootstrap();
