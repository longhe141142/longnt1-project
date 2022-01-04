import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpAdapterHost } from '@nestjs/common';
import { useContainer, Validator } from 'class-validator';
import { GloBalHttpExceptionFilter } from './utils/http-exception.filter';
import { AppModule } from './app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import * as hbs from 'hbs';

import { join } from 'path';

async function bootstrap() {
  let FastifyAdapterHost = new FastifyAdapter()
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    FastifyAdapterHost
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
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

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
