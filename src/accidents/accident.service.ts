import { Injectable } from '@nestjs/common';
import { PrismaClient, EmployeeAccident } from '@prisma/client';
import { IEmployeeAccident } from './i-accidents.service';
const prisma = new PrismaClient();

@Injectable()
export class accidentsService implements IEmployeeAccident {
  async addAccident(dto: any): Promise<EmployeeAccident> {
    const accident = await prisma.employeeAccident.create({
      data: {
        ...dto,
        status: true,
      },
    });
    return accident as EmployeeAccident;
  }
  async accidentList(dto: any): Promise<object[]> {
    let queryArgs = {
      where: {},
    };
    if (dto.province) {
      queryArgs = {
        where: {
          provinceID: dto.province,
        },
      };
    }
    // if (dto.search) {
    //   queryArgs.where = {
    //     employee: {
    //       name: {
    //         contains: dto.search,
    //         mode: 'insensitive',
    //       }
    //     },
    //   };
    // }
    if (dto.project) {
      queryArgs.where = {
        projectID: dto.project,
        ...queryArgs.where,
      };
    }
    if (dto.status) {
      queryArgs.where = {
        adminReviewed: dto.status,
        ...queryArgs.where,
      };
    }
    queryArgs.where = {
      status: true,
      ...queryArgs.where,
    };
    const accidents = await prisma.employeeAccident.findMany({
      ...queryArgs,
      select: {
        id: true,
        employee: {
          select: {
            name: true,
            id: true,
            role: true,
            maestro: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        province: {
          select: {
            name: true,
            id: true,
          },
        },
        project: {
          select: {
            name: true,
            id: true,
          },
        },
        description: true,
        adminReviewed: true,
        images: true,
        image: true,
      },
    });
    console.log(accidents)
    return accidents;
  }
  async editAccident(dto: any) {
    const accident = await prisma.employeeAccident.update({
      where: {
        id: dto.id,
      },
      data: {
        employeeID: dto.employeeID,
        provinceID: dto.provinceID,
        projectID: dto.projectID,
        description: dto.description,
        adminReviewed: dto.adminReviewed,
        image: dto.image,
        status: true,
      },
    });
    return accident as any;
  }
  async disableAccident(dto: any): Promise<EmployeeAccident> {
    const accident = await prisma.employeeAccident.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
    });
    return accident;
  }
  // async getfile(dto: any): Promise<string> {
  //   console.log(dto)
  //   return "hola mundo"
  // }
}
