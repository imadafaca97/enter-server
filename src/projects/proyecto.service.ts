import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ProyectoService {
  async addProyect(dto: any) {
    const proyecto = await prisma.proyecto.create({
      data: {
        name: dto.name,
        provinciaId: dto.provinciaId,
        address: dto.address,
        description: dto.description,
      },
    });
    return proyecto;
  }
  async editProject(dto: any) {
    const proyecto = await prisma.proyecto.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        provinciaId: dto.provinciaId,
        address: dto.address,
        description: dto.description,
      },
    });
    return proyecto;
  }
  async getProjects() {
    const proyecto = await prisma.proyecto.findMany({});
    return proyecto;
  }
  async filterProjects(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.provinceID) {
      queryArgs.where = {
        provinciaId: dto.provinceID,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        name: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
      };
    }
    const proyecto = await prisma.proyecto.findMany({
      ...queryArgs,
      include: {
        provincia: true,
      },
    });
    return proyecto;
  }
  async getProjectsByProvince(dto: any) {
    const proyecto = await prisma.proyecto.findMany({
      where: {
        provinciaId: {
          equals: dto.provinciaId,
        },
      },
    });
    return proyecto;
  }
}
