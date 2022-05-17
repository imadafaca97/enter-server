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
        email:dto.email,
        docNumber: dto.docNumber,
        password: dto.password,
        userCreated: true,
        isAdmin: false,
      },
    });
    return user;
  }
  
  async getAll() {
    const user = await prisma.users.findMany();
    return user;
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
        isAdmin : true,
        password : true
      }
    });

    return user as Users;
  }
  
  async getById(uid : string){
    const user = await prisma.users.findFirst({
      where: {
        uid
      },
      select: {
        name : true,
        lastName : true,
        docNumber : true,
        email : true, 
        isAdmin : true,
        password : true
      }
    });

    return user as Users;
  }
}