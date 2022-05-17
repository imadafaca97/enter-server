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
        email: dto.email,
        status: true,
        docNumber: dto.docNumber,
        userCreated: true,
        isSupervisor: false,
        roleID: dto.role,
      },
    });
    return user;
  }
  async editUser(dto) {
    const user = await prisma.users.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        lastName: dto.lastName,
        email: dto.email,
        docNumber: dto.docNumber,
        userCreated: true,
        isSupervisor: false,
        roleID: dto.role,
      },
    });
    return user;
  }
  async disableUser(dto) {
    const user = await prisma.users.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
    });
    return user;
  }
  async getall() {
    const user = await prisma.users.findMany({});
    return user;
  }
  async filterUsers(dto) {
    let queryArgs = {
      where: {},
    };
    if (dto.role) {
      queryArgs = {
        where: {
          roleID: dto.role,
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
      ...queryArgs.where
    }
    const users = await prisma.users.findMany(queryArgs);
    return users;
  }
}
