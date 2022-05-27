import { Injectable } from '@nestjs/common';
import { Maestro, PrismaClient } from '@prisma/client';
import { IMaestroService } from './i-maestros.service';
const prisma = new PrismaClient();

@Injectable()
export class MaestroService implements IMaestroService {
  async addMaestro(dto: any) {
    const maestro = await prisma.maestro.create({
      data: {
        name: dto.name,
        docNumber: dto.docNumber,
        laborID: dto.laborID,
        proyectosIds: dto.proyectosIds,
        status: true,
      },
    });
    return maestro;
  }

  async editMaestro(dto: any) {
    const maestro = await prisma.maestro.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        docNumber: dto.docNumber,
        laborID: dto.laborID,
        proyectosIds: dto.proyectosIds,
        status: true,
      }
    });
    return maestro as any;
  }
  async disableMaestro(dto: any) {
    const maestro = await prisma.maestro.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      }
    });
    return maestro as any;
  }

  async getMaestros() {
    let maestro = await prisma.maestro.findMany({
      where: {status: true},
      include: {
        labor: true,
        proyectos: true,
        empleados: true
      }
    });
    return maestro as object[];
  }

  async filterMaestro(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.laborID) {
      queryArgs = {
        where: {
          laborID: dto.laborID,
        },
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
    queryArgs.where = {
      ...queryArgs.where,
      status: true,
    };
    const Maestro = await prisma.maestro.findMany({
      ...queryArgs,
      include: {
        labor: true,
        proyectos: true
      }
    });
    return Maestro;
  }
  
  async getByProject(dto: Maestro): Promise<object[]> {
      const maestro = await prisma.maestro.findMany({
          where:{
            proyectosIds: {
              has: dto.id
            }
          }
      });
      return maestro;
  }

}

