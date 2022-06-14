import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ok } from 'assert';

const prisma = new PrismaClient();
@Injectable()
export class VisitService {
  async filterVisits(dto: any) {
    const queryArgs = {
      where: {},
    };
    if (dto.search) {
      queryArgs.where = {
        name: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
      };
    }
    if (dto.proyectoID) {
      queryArgs.where = {
        projectID: dto.proyectoID,
        ...queryArgs.where,
      };
    }
    const visits = await prisma.visit.findMany({
      ...queryArgs,
      include: {
        proyecto: true,
      },
    });
    return visits;
  }
  async addVisit(dto: any) {
    await prisma.visit.create({
      data: {
        ...dto,
      },
    });
    return ok;
  }
  async delteVisit(dto: any) {
    await prisma.visit.delete({
      where: {
        id: dto.id,
      },
    });
  }
  async editVisit(dto: any){
    await prisma.visit.update({
      where:{
        id: dto.id
      },
      data: {
        projectID: dto.projectID,
        docNumber: dto.docNumber,
        name: dto.name,
        company: dto.company,
        position: dto.position,
        start: dto.start,
        final: dto.final,
        status: true,
      },
    })
  }
}
