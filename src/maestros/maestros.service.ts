import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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
        proyectos: true
      }
    });
    return maestro as object[];
  }

  async filterMaestro(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.role) {
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
        },
        ...queryArgs.where,
      };
    }
    queryArgs.where = {
      status: true,
      ...queryArgs.where,
    };
    const Maestro = await prisma.maestro.findMany({
      ...queryArgs,
      select: {
        id: true,
        name: true,
        docNumber: true,
        proyectosIds: true,
        status: true,
        labor: {
          select: {
            type: true,
            id: true
          },
        },
      },
    });
    return Maestro;
  }
  // async getById(dto: any) {
  //   const maestro = await prisma.maestro.findFirst({
  //     where: {
  //       id: dto.id,
  //     },
  //     select: {
  //       name: true,
  //       docNumber: true,
  //       proyectosIds: true,
  //       status: true,
  //       // labor: {
  //       //   select: {
  //       //     id: true,
  //       //     type: true,
  //       //   },
  //       // },
  //     },
  //   });

  //   return maestro;
  // }
}

