import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {
  async addEmployer(dto) {
    const employee = await prisma.empleado.create({
      data: {
        name: dto.name,
        role: dto.role,
        proyectosIds: dto.project,
        provinciaId: dto.province,
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
  async getById(dto) {
    console.log(dto);
    const employee = await prisma.empleado.findFirst({
      where: {
        id: dto.id,
      },
    });
    return employee;
  }

  async updateEmployee(dto) {
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        proyectosIds: dto.proyectos,
        provinciaId: dto.provincia,
      },
    });
    return employee;
  }
  async employeEntry(dto) {
    try {
      let employee = await prisma.empleado.findFirst({
        where: {
          id: dto.employee,
        },
      });
      if (employee) {
        await prisma.employeesEntry.create({
          data: {
            employeeID: dto.employee,
          },
        });
        return employee;
      }
    } catch (err) {
      return err;
    }
  }
  async getEntries(dto) {
    let entries = await prisma.employeesEntry.findMany({
      include: {
        employee: {
          select: {
            proyectos: true,
            provincia: true,
            name: true,
            role: true
          },
        },
      },
    });
    return entries;
  }

}
