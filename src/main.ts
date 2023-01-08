import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const Knex = require('knex');
import knexConfig from '../knexfile';
import { Model } from 'objection';

const knex = Knex(knexConfig.development);
Model.knex(knex);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
