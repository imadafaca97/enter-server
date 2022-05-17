import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class RoleService {
  async addRole(dto) {
    await prisma.userRole.create({
        data: {
          name: dto.name,
          description: dto.description,
          status: true,
        },
      });
      return 'ok';
  }
  async getRoles() {
    const roles = await prisma.userRole.findMany({
      where:{
        status: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        users: true,
      },
    });
    return roles;
  }
  async editRole(dto) {
    let edited = await prisma.userRole.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
    return edited
  }
  async disableRol(dto) {
    let disabled = await prisma.userRole.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
    });
    return disabled
  }
}
