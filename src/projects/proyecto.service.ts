import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ProyectoService {
  async addProyect(dto : any) {
    const proyecto = await prisma.proyecto.create({
      data: {
        name: dto.name,
        provinciaId: dto.provinciaId,
        address: dto.address,
        description: dto.description 
      },
    });
    return proyecto;
  }
  async getProjects() {
    const proyecto = await prisma.proyecto.findMany({});
    return proyecto;
  }

}
