import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import {
  FallbackExpectionFilter,
  ValidationFilter,
} from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:3000' });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalFilters(new FallbackExpectionFilter(), new ValidationFilter());

  await app.listen(process.env['API_PORT'] || 3333);
}
bootstrap();
