// import { INestApplication } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as bodyParser from 'body-parser';
// import { DatabaseSetupService } from '../libs/dh-db/src/service/database-setup.service';
// import { AppModule } from './app.module';
// import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
//
// export async function bootstrap() {
//   let app: INestApplication & NestExpressApplication;
//   // if (EnvironmentService.NODE_ENV === 'test') {
//   //   const { Test } = require('@nestjs/testing');
//   //   app = (await Test.createTestingModule({
//   //     imports: [AppModule],
//   //   }).compile()).createNestApplication();
//   // } else {
//   app = await NestFactory.create(AppModule);
//   // }
//
//   app.enableCors();
//
//   app.use(RequestContextMiddleware.rawExpressMiddleware);
//
//   // app.useGlobalFilters(new AllExceptionsFilter());
//   app.use(bodyParser.json({ limit: '50mb' }));
//   app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//
//   // setup swagger
//   const options = new DocumentBuilder()
//     .setTitle('MAIN API')
//     .setDescription('Ethix Main API')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('docs', app, document);
//
//   // if (EnvironmentService.NODE_ENV === 'test') {
//   //   await app.init();
//   // } else {
//   const port = process.env.PORT || 3206;
//   const server = await app.listen(port, () => {
//     // tslint:disable-next-line:no-console
//   });
//   // tslint:disable-next-line: no-console
//   console.log(`===== Server listening on port ${port} =====`);
//   server.timeout = 1000 * 60 * 10; // 10 minutes
//   // }
//
//   return app;
// }
