import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ProyectoService {
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
  async getProjects() {
    const proyecto = await prisma.proyecto.findMany({});
    return proyecto;
  }
  async updateProject(dto) {
    const proyecto = await prisma.proyecto.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        provinciaId: dto.provincia,
        empleados: dto.empleados,
      },
    });
    return proyecto;
  }
}
