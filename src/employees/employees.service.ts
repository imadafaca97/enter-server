import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {

  async addEmployee(dto) {
    const employee = await prisma.empleado.create({
      data: {
        name: dto.name,
        proyectosIds: dto.proyectos,
        provinciaId: dto.provincia,
      },
    });
    return employee;
  }
  async getall() {
    const empleados = await prisma.empleado.findMany({});
    return empleados;
  }

  async updateEmployee(dto) {
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        proyectosIds: dto.proyectos,
        provinciaId: dto.provincia,
      },
    });
    return employee;
  }

}
