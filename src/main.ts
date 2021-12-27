import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import * as hbs from 'hbs';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    // prefix: '/public/',
  });
  app.setViewEngine({
    engine: hbs,
    templates: join(__dirname, '..', 'views'),
  });
  hbs.registerPartials(
    join(__dirname, '..', '/public/monster-admin/monster-html/common/partials'),
  );
  hbs.registerHelper('setVar', function (varName, varValue, options) {
    options.data.root[varName] = varValue;
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
