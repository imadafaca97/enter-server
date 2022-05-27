import { Injectable } from '@nestjs/common';
import { Empleado, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {
  async addEmployer(dto: Empleado) {
    const employee = await prisma.empleado.create({
      data: {
        name: dto.name,
        role: dto.role,
        proyectosIds: ['628e77e410fc8f385028258b', '628e77fc10fc8f385028258c'],
        provinciaId: dto.provinciaId,
        maestroId: dto.maestroId,
      },
    });
    return employee;
  }
  async getall() {
    const empleados = await prisma.empleado.findMany({
      include: {
        provincia: true,
        proyectos: true,
        maestro: true,
      },
    });
    return empleados;
  }

  async deleteAll() {
    await prisma.empleado.deleteMany();
    return 'Deleted All';
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
  async employeEntry(dto: any) {
    try {
      let employee = await prisma.empleado.findFirst({
        where: {
          id: {
            equals: dto.id,
          },
        },
      });

      if (employee) {
        await prisma.employeesEntry.create({
          data: {
            employeeID: dto.id,
            provinciaID: employee.provinciaId,
          },
        });
        return employee;
      }
    } catch (err) {
      return err + 'error';
    }
  }
  async employeeExit(dto: any) {
    try {
      let employee = await prisma.empleado.findFirst({
        where: {
          id: {
            equals: dto.id,
          },
        },
      });

      if (employee) {
        await prisma.employeesExit.create({
          data: {
            employeeID: dto.id,
            provinciaID: employee.provinciaId,
          },
        });
        return employee;
      }
    } catch (err) {
      return err + 'error';
    }
  }
  async getEntries(dto: any) {
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
  async filterEntries(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.provinceID) {
      queryArgs.where = {
        provinciaID: dto.provinceID,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        employee: {
          name: {
            contains: dto.search,
          },
        },
      };
    }
    let entries = await prisma.employeesEntry.findMany({
      ...queryArgs,
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
  async filterExits(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.provinceID) {
      queryArgs.where = {
        provinciaID: dto.provinceID,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        employee: {
          name: {
            contains: dto.search,
          },
        },
      };
    }
    let exits = await prisma.employeesExit.findMany({
      ...queryArgs,
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
    return exits;
  }
  async getEntriesbyProvince(dto: any) {
    const entries = await prisma.employeesEntry.findMany({
      where: {
        provinciaID: dto.id,
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

    const employees = await prisma.empleado.findMany({
      ...queryArgs,
      include: {
        provincia: true,
        proyectos: true,
        maestro: true,
      },
    });

    return employees;
  }
  async deleteEmployee(dto: any) {
    const employee = await prisma.empleado.delete({
      where: {
        id: dto.id,
      },
    });
    return employee;
  }
  async editEmployee(dto: any) {
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        role: dto.role,
        proyectosIds: ['628e77fc10fc8f385028258c', '628e77fc10fc8f385028258c'],
        provinciaId: dto.provinciaId,
        maestroId: dto.maestroId,
      },
    });
    return employee;
  }
}
