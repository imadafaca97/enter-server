import { Body, Controller, Get, Post } from '@nestjs/common';
import { provinciasService } from './provincias.service';
@Controller('provincias')
export class provinciasController {
  constructor(private provinciasService: provinciasService) {}

  @Get('get')
  getall() {
    return this.provinciasService.getall();
  }
  @Get('getWithProyectos')
  getProyects() {
    return this.provinciasService.provinciasyempleados();
  }
  @Post('add')
  addProvincia(@Body() dto: any) {
    return this.provinciasService.addProvincia(dto);
  }
  @Post('addProyect')
  addProyect(@Body() dto: any) {
    return this.provinciasService.addProyect(dto);
  }
  @Post('add-employer')
  addEmployer(@Body() dto: any) {
    return this.provinciasService.addEmployer(dto);
  }
}
