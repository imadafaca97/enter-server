import {  Body,Controller, Get, Post,Query } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';

@Controller('project')
export class ProyectoController {
  constructor(private ProyectoService: ProyectoService) {}

  @Get('get-projects')
  getall() {
    return this.ProyectoService.getProjects();
  }
  @Post('addProject')
  addProyect(@Query() dto: any) {
    return this.ProyectoService.addProyect(dto);
  }

  @Get('getByProvince')
  getProjectsByProvince(@Body() dto : any){
    return this.ProyectoService.getProjectsByProvince(dto)
  }
}
