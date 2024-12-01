import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ConfigService } from '@nestjs/config';
// import { Logger } from 'nestjs-pino';

// import * as Sentry from '@sentry/nestjs';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
// import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/global-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .setTitle('FlyMate API')
    .setDescription('API documentation for FlyMate Travel Companion')
    .setVersion('1.0')
    .addTag('flights')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // const configService = app.get(ConfigService);

  // Sentry.init({
  //   dsn: configService.get<string>('SENTRY_DSN'),
  //   integrations: [nodeProfilingIntegration()],
  //   tracesSampleRate: 1.0,
  //   profilesSampleRate: 1.0,
  // });

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));
  // app.use(morgan('dev'));
  app.use(cors());
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000,
  //     max: 100,
  //   }),
  // );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.useLogger(app.get(Logger));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
