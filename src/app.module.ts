import { Module } from '@nestjs/common';
import { provinciasModule } from './provincias/provincias.module';
import { employeesModule } from './employees/employees.module';

@Module({
  imports: [provinciasModule,employeesModule],
})
export class AppModule {}

