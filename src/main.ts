import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, authorization',
  });
  


    // Open API
  //   const options = new DocumentBuilder()
  //   .setTitle('API')
  //   .setDescription('API DO SISTEMA DE VENDAS ONLINE')
  //   .setVersion('1.0.0')
  //   .addTag('API')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('docs', app, document);
// Open API



  await app.listen(process.env.PORT || 3000);
}
bootstrap();
