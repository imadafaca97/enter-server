import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {

  async addEmployee(dto) {
    const post = await prisma.empleado.create({
      data: {
        name: dto.name,
        proyectosIds: dto.proyectosIds,
      },
    });
    return post;
  }
  async getall() {
    console.log('Hola Empleado')
    const proyectos = await prisma.empleado.findMany({
      include: {
        proyectos: true,
      },
    });
    return proyectos;
  }
  async provinciasyempleados() {
    const provincia = await prisma.provincia.findMany({
      select: {
        name: true,
        path: true,
        proyectos: {
          select: {
            empleados: true,
          },
        },
      },
    });
    return provincia;
  }
}
