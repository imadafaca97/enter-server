import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {

  async addEmployer(dto) {
    const employer = await prisma.empleado.create({
      data: {
        name: dto.name,
        proyectosIds: dto.proyectos,
        provinciaId: dto.provincia,
      },
    });
    return employer;
  }
  async getall() {
    console.log('Hola Empleado')
    const empleados = await prisma.empleado.findMany({
      include: {
        proyectos: true,
      },
    });
    return empleados;
  }
}
