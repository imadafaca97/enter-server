import { Injectable } from "@nestjs/common";
import { Maestro, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class maestrosService {
  async addMaestro(dto: Maestro) {
    const maestro = await prisma.maestro.create({
      data: {
        name: dto.name,
        laborId: dto.laborId,
        proyectosIds: dto.proyectosIds,
        docNumber: dto.docNumber
      },
    });
    return maestro;
  }
  async getall() {
    const maestro = await prisma.maestro.findMany({
      include: {
        empleados: true,
        labor: true,
        proyectos: true,
      },
    });
    return maestro;
  }
}