import { Module } from '@nestjs/common';
import { provinciasModule } from './provincias/provincias.module';

@Module({
  imports: [provinciasModule],
})
export class AppModule {}
