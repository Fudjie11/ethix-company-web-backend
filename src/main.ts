import './main-setup-config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
async function bootstrap() {
  let app: INestApplication & NestExpressApplication;
  app = await NestFactory.create(AppModule);

  const corsOption = {
    origin : '*'
  }

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs');
  app.enableCors();
  app.use(RequestContextMiddleware.rawExpressMiddleware);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const options = new DocumentBuilder()
    .setTitle('MAIN API')
    .setDescription('Lazis DH Main API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3206;
  const server = await app.listen(port, () => {
    // tslint:disable-next-line:no-console
  });

  console.log(`===== Server listening on port ${port} =====`);
  server.timeout = 1000 * 60 * 10; // 10 minutes

  return app;
  // await app.listen(3206);
}
bootstrap();

