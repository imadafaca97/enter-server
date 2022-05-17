import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FallbackExpectionFilter, ValidationFilter } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({origin: 'http://localhost:3000'});
  
  app.useGlobalFilters(new FallbackExpectionFilter(), new ValidationFilter())

  await app.listen(process.env['API_PORT'] || 3333);
}
bootstrap();
