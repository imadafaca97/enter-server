import { ForbiddenException, Injectable } from '@nestjs/common';
import { Empleado, PrismaClient } from '@prisma/client';
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
        },include:{
          maestro: true
        }
      });
      if (!employee) throw new ForbiddenException('no existe este empleado');
      let entry = await prisma.employeesEntry.findFirst({
        where: {
          employeeID: employee.id,
        },
        orderBy: {
          createdAt: "desc"
        },
      });
      if (entry) {
        const fecha = new Date(entry!.createdAt).toLocaleDateString();
        const ahora = new Date().toLocaleDateString();
        if (fecha == ahora) {
          throw new ForbiddenException('Este usuario ya entro.');
        } else {
          await prisma.employeesEntry.create({
            data: {
              employeeID: entry.id,
              provinciaID: entry.provinciaID,
              maestroID: entry.maestroID,
              proyectoID: dto.proyectoID,
              nombre: employee.name,
              laborID: employee.maestro.laborID,
            },
          });
        }
      } else {
        await prisma.employeesEntry.create({
          data: {
            employeeID: employee.id,
            provinciaID: employee.provinciaId,
            maestroID: employee.maestroId,
            proyectoID: dto.proyectoID,
            nombre: employee.name,
            laborID: employee.maestro.laborID,
          },
        });
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
      if (!employee) throw new ForbiddenException('no existe este empleado');

      let exit = await prisma.employeesExit.findFirst({
        where: {
          employeeID: employee.id,
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      if (exit) {
        const fecha = new Date(exit!.createdAt).toLocaleDateString();
        const ahora = new Date().toLocaleDateString();
        if (fecha == ahora) {
          throw new ForbiddenException('Este usuario ya salio.');
        } else {
          await prisma.employeesExit.create({
            data: {
              employeeID: exit.id,
              provinciaID: exit.provinciaID,
              maestroID: exit.maestroID,
              proyectoID: dto.proyectoID,
              nombre: employee.name,
            },
          });
        }
      } else {
        await prisma.employeesExit.create({
          data: {
            employeeID: employee.id,
            provinciaID: employee.provinciaId,
            maestroID: employee.maestroId,
            proyectoID: dto.proyectoID,
            nombre: employee.name,
          },
        });
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

  async getEntriesByProject (dto : any){
    let entries = await prisma.employeesEntry.findMany({
      where:{
        proyectoID: dto.id
      }
    })
    return entries
  }

  async filterEntries(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.province) {
      queryArgs.where = {
        provinciaID: dto.province,
        ...queryArgs.where,
      };
    }
    if (dto.project) {
      queryArgs.where = {
        proyectoID: dto.project,
        ...queryArgs.where,
      };
    }
    if (dto.maestro) {
      queryArgs.where = {
        maestroID: dto.maestro,
        ...queryArgs.where,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        nombre: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
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
        proyecto: true,
      },
    });
    return entries;
  }
  async filterExits(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.province) {
      queryArgs.where = {
        provinciaID: dto.province,
        ...queryArgs.where,
      };
    }
    if (dto.project) {
      queryArgs.where = {
        proyectoID: dto.project,
        ...queryArgs.where,
      };
    }
    if (dto.maestro) {
      queryArgs.where = {
        maestroID: dto.maestro,
        ...queryArgs.where,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        nombre: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
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
        proyecto: true,
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

  async getEntriesByMaestro(dto: any) {
    console.log(dto.projectID)
    const employee = await prisma.employeesEntry.findMany({
      where: {
        maestroID: dto.id,
        AND:{
          proyectoID: dto.projectID
        }
      },
      select: {
        createdAt: true,
        employee: true,
      },
    });
    return employee;
  }

  async getEntriesByLabor(dto: any){
    console.log(dto.projectID)
    const employee = await prisma.employeesEntry.findMany({
      where: {
        laborID: dto.id,
        AND:{
          proyectoID: dto.projectID
        }
      },
      select: {
        createdAt: true,
        employee: true,
      },
    });
    return employee
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
    if (dto.proyectoID) {
      queryArgs.where = {
        proyectosIds: {
          has: dto.proyectoID
        }
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
        proyectosIds: dto.proyectosIds,
        provinciaId: dto.provinciaId,
        maestroId: dto.maestroId,
      },
    });
    return employee;
  }
}
