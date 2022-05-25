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
        proyectosIds: ['6272acb0c32a2199e3b4f683','6272b5f7b30d8f118348a8a7'],
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
        maestro: true
      },
    });
    return empleados;
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
  async filterEmployees(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.search) {
      queryArgs.where = {
        name: {
          contains: dto.search,
          mode: 'insensitive',
        },
      };
    }
    if (dto.provinciaId) {
      queryArgs.where = {
        provinciaId: dto.provinciaId,
      };
    }
    if (dto.maestroId) {
      queryArgs.where = {
        maestroId: dto.maestroId,
      };
    }

    const employees = prisma.empleado.findMany({
      ...queryArgs,
      include: {
        provincia: true,
        proyectos: true,
        maestro: true
      },
    });
    return employees;
  }
  async deleteEmployee(dto: any){
    const employee = await prisma.empleado.delete({
      where: {
        id: dto.id
      }
    })
    return employee
  }
  async editEmployee(dto: any){
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id
      },
      data:{
        name: dto.name,
        role: dto.role,
        proyectosIds: ['6272acb0c32a2199e3b4f683','6272b5f7b30d8f118348a8a7'],
        provinciaId: dto.provinciaId,
        maestroId: dto.maestroId
      },
    })
    return employee
  }
}
