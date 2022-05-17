import { Injectable } from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { IUsersService } from './i-user.service';
const prisma = new PrismaClient();

@Injectable()
export class UsersService implements IUsersService {

  async addUser(dto : Users) {
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
        password: dto.password,
        userCreated: true,
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
  
  async getAll() {
    const user = await prisma.users.findMany();
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

  async getByEmail(email : string): Promise<Partial<Users>> {
    const user = await prisma.users.findUnique({
      where: {
        email
      },
      select: {
        name : true,
        lastName : true,
        docNumber : true,
        email : true, 
        password : true
      }
    });

    return user as Users;
  }
  
  async getById(id : string){
    const user = await prisma.users.findFirst({
      where: {
        id
      },
      select: {
        name : true,
        lastName : true,
        docNumber : true,
        email : true, 
        password : true
      }
    });

    return user as Users;
  }
}