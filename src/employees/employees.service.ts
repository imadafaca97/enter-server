import { Injectable } from '@nestjs/common';
import { Empleado, EmployeesEntry, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {
  async addEmployer(dto: Empleado) {
    const employee = await prisma.empleado.create({
      data: {
        name: dto.name,
        role: dto.role,
        proyectosIds: dto.proyectosIds,
        provinciaId: dto.provinciaId,
        maestroId: dto.maestroId
      },
    });
    return employee;
  }
  async getall() {
    const empleados = await prisma.empleado.findMany({
      include: {
        provincia: true,
        proyectos: true,
      },
    });
    return empleados;
  }

  async deleteAll(){
     await prisma.empleado.deleteMany();
     return 'Deleted All'
  }

  async getById(dto: Empleado) {
    const employee = await prisma.empleado.findFirst({
      where: {
        id: dto.id,
      },
    });
    return employee;
  }

  async updateEmployee(dto: Empleado) {
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        role: dto.role,
        proyectosIds: dto.proyectosIds,
        provinciaId: dto.provinciaId,
      },
    });
    return employee;
  }
  async employeEntry(dto: EmployeesEntry) {
    try {
      let employee = await prisma.empleado.findFirst({
        where: {
          id: dto.id,
        },
      });
      if (employee) {
        await prisma.employeesEntry.create({
          data: {
            employeeID: dto.employeeID,
            provinceID: dto.provinceID,
          },
        });
        return employee;
      }
    } catch (err) {
      return err;
    }
  }
  async getEntries(dto: EmployeesEntry) {
    let entries = await prisma.employeesEntry.findMany({
      include: {
        employee: {
          select: {
            proyectos: true,
            provincia: true,
            name: true,
            role: true,
          },
        },
      },
    });
    return entries;
  }
  async getEntriesbyProvince(dto : EmployeesEntry){
    const entries = await prisma.employeesEntry.findMany({
      where:{
        provinceID: dto.id
      }
    })
    return entries
  }

  async filterEmployees(dto: string) {
    let queryArgs = {
      where: {},
    };
    if (dto) {
      queryArgs.where = {
        name: {
          contains: dto.search,
        },
      };
    }
    const employees = prisma.empleado.findMany({
      ...queryArgs,
      include: {
        provincia: true,
        proyectos: true,
      },
    });
    return employees;
  }
}
