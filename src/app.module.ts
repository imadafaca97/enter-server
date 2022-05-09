import { Module } from '@nestjs/common';
import { provinciasModule } from './provincias/provincias.module';
import { employeesModule } from './employees/employees.module';
import { moduleProyecto } from './proyectos/proyecto.module';
import { usersModule } from './users/users.module';
import { permitssModule } from './permits/permits.module';

@Module({
  imports: [provinciasModule, employeesModule, moduleProyecto,usersModule,permitssModule],
})
export class AppModule {}
