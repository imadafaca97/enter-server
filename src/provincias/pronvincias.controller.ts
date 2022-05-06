import { Body, Controller, Get, Post } from '@nestjs/common';
import { provinciasService } from './provincias.service';
@Controller('provincias')
export class provinciasController {
  constructor(private provinciasService: provinciasService) {}

  @Get('get')
  getall() {
    return this.provinciasService.getall();
  }
  @Get('provinceInfo')
  getProyects() {
    return this.provinciasService.provinceInfo();
  }
  
}
