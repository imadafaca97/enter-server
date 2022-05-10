import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class permitsService {

  async addPermit(dto) {
    const user = await prisma.permits.create({
      data: {
      idEmployee: dto.idEmployee,
      description: dto.description,
      },
    });
    return user;
  }
  async getall() {
    const user = await prisma.permits.findMany({});
    return user;
  }

}