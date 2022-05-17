import { Module } from '@nestjs/common';
import { provinciasModule } from './provincias/provincias.module';
import { employeesModule } from './employees/employees.module';

import { moduleProyecto } from './projects/proyecto.module';
import { UsersModule } from './users/users.module';
import { permitssModule } from './permissions/permits.module';
import { AuthModule } from './auth/auth.module';
import { roleModule } from './roles/role.module';

@Module({
  imports: [provinciasModule, 
            employeesModule, 
            moduleProyecto,
            UsersModule,
            permitssModule,
            AuthModule,
            roleModule]
})
export class AppModule {}
