import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fabrotec API')
    .setDescription('The Fabrotec API description')
    .setVersion('1.0')
    .addTag('fabrotec')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('public/api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
