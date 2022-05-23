import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class LaborService {
  async addLabor(dto: any) {
    const labor = await prisma.labor.create({
      data: {
        type: dto.name,
        description: dto.description,
        status: true,
      },
    });
    return labor;
  }
  async getLabores() {
    const Labores = await prisma.labor.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        type: true,
        description: true,
        maestros: {
          select: {
            name: true,
            docNumber: true,
            laborID: true,
          },
        },
      },
    });
    return Labores;
  }
  async editLabor(dto: any) {
    const edited = await prisma.labor.update({
      where: {
        id: dto.id,
      },
      data: {
        type: dto.name,
        description: dto.description,
      },
    });
    return edited;
  }
  async disableLabor(dto: any) {
    const disabled = await prisma.labor.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
    });
    return disabled;
  }
}