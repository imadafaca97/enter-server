import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable({})
export class provinciasService {
  async addProvincia(dto) {
    const post = await prisma.proyecto.create({
      data: {
        name: 'Escuela',
        provinciaId: '6271b01ba5394f5c9e7cf63e',
      },
    });
    return post;
  }
  async getall() {
    console.log('Hola')
    const proyectos = await prisma.provincia.findMany({
      include: {
        proyectos: true,
      },
    });
    return proyectos;
  }
  async addEmployer(dto) {
    const employer = await prisma.empleado.create({
      data: {
        name: dto.name,
        proyectosIds: dto.proyectos,
      },
    });
    return employer;
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
  async addProyect(dto) {
    const proyecto = await prisma.proyecto.create({
      data: {
        name: dto.name,
        empleadosIds: '6272aceddecb9d12e790839d',
        provinciaId: dto.provinciaId,
      },
    });
    return proyecto;
  }
}
