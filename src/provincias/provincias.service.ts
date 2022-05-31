import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable({})
export class provinciasService {
 
  async getall() {
    const provincias = await prisma.provincia.findMany({
      include: {
        proyectos: true,
      },
    });
    return provincias;
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
  async editProvince(dto: any) {
    const province = await prisma.provincia.update({
      where: {
        id: dto.provinceId,
      },
      data: {
        name: dto.province
      },
    });
    return province as any;
  }
  async filterProvince(dto: any){
    let query = {
      where: {}
    };
    if (dto.search) {
      query.where = {name: {contains: dto.search, mode: 'insensitive'}}
    }
    const province = await prisma.provincia.findMany({...query});
    return province;
  }
}
