import { Injectable } from '@nestjs/common';
import { PrismaClient, Proyecto } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ProyectoService {
  async addProyect(dto : Proyecto) {
    const proyecto = await prisma.proyecto.create({
      data: {
        name: dto.name,
        empleadosIds: dto.empleadosIds,
        provinciaId: dto.provinciaId,
      },
    });
    return proyecto;
  }
  async getProjects() {
    const proyecto = await prisma.proyecto.findMany({});
    return proyecto;
  }

}
