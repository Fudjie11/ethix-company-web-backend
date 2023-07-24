import './main-setup-config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { json, urlencoded } from 'express';
async function bootstrap() {
  let app: INestApplication & NestExpressApplication;
  app = await NestFactory.create(AppModule);

  const corsOption = {
    origin : '*'
  }

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs');
  app.enableCors(
    {
      origin: [
        'https://ethix-website-staging.vercel.app',
        'https://ethix-admin-staging.vercel.app',
        'http://localhost:8000',
        'http://localhost:4000'
      ],
      credentials: true
    }
  );
  app.use(RequestContextMiddleware.rawExpressMiddleware);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const options = new DocumentBuilder()
    .setTitle('MAIN API')
    .setDescription('Ethix Main API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3206;
  const server = await app.listen(port, () => {
  });

  console.log(`===== Server listening on port ${port} =====`);
  server.timeout = 1000 * 60 * 10; // 10 minutes

  return app;
  // await app.listen(3206);
}
bootstrap();

