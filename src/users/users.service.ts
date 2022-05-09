import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class usersService {

  async addUser(dto) {
    const user = await prisma.users.create({
      data: {
        name: dto.name,
        lastName: dto.lastName,
        email:dto.email,
        docNumber: dto.docNumber,
        userCreated: true,
        isSupervisor: false,
      },
    });
    return user;
  }
  async getall() {
    const user = await prisma.users.findMany({});
    return user;
  }

}