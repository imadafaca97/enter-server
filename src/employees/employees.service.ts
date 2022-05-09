import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {

  async addEmployer(dto) {
    const employee = await prisma.empleado.create({
      data: {
        name: dto.name,
        proyectosIds: dto.proyectos,
        provinciaId: dto.provincia,
      },
    });
    return employee;
  }
  async getall() {
    const empleados = await prisma.empleado.findMany({
      include:{
        provincia: true,
        proyectos: true
      }
    });
    return empleados;
  }
  async getById(dto){
    console.log(dto)
    const employee = await prisma.empleado.findFirst({
      where:{
        id: dto.id
      }
    })
    return employee
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

}
