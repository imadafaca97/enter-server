import { Module } from '@nestjs/common';
import { maestrosController } from './maestros.controller';
import { maestrosService } from './maestros.service';

@Module({
  controllers: [maestrosController],
  providers: [maestrosService],
})
export class maestrosModule {}
