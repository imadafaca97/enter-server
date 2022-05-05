import { Module } from '@nestjs/common';
import { provinciasModule } from './provincias/provincias.module';
import { employeesModule } from './employees/employees.module';
import { moduleProyecto } from './proyectos/proyecto.module';

@Module({
  imports: [provinciasModule, employeesModule, moduleProyecto],
})
export class AppModule {}
