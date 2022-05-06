import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable({})
export class provinciasService {
 
  async getall() {
    console.log('Hola')
    const proyectos = await prisma.provincia.findMany({
      include: {
        proyectos: true,
      },
    });
    return proyectos;
  }
  async provinceInfo() {
    const provincia = await prisma.provincia.findMany({
      select: {
        name: true,
        path: true,
        proyectos: true,
        empleados: true,
        id: true
      },
    });
    return provincia;
  }
}
