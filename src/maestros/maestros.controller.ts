import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Maestro } from '@prisma/client';
import { IMaestroService } from './i-maestros.service';
@Controller('maestros')
export class MaestrosController {
  constructor(
    @Inject('IMaestroService')
    private readonly _maestroService: IMaestroService,
  ) {}

  @Get('getAll')
  async getAll() {
    return await this._maestroService.getAll();
  }
  @Post('add')
  addMaestro(@Body() dto: any) {
    return this._maestroService.addMaestro(dto);
  }
  @Post('filterMaestros')
  filterMaestro(@Body() dto: Maestro) {
    return this._maestroService.filterMaestro(dto);
  }
  // @Post('getById')
  // getById(@Body() dto: any) {
  //   return this._maestroService.getById(dto);
  // }
  @Post('editmaestro')
  editMaestro(@Body() dto: Maestro) {
    return this._maestroService.editMaestro(dto);
  }
  @Post('disablemaestro')
  disableMaestro(@Body() dto: any) {
    return this._maestroService.disableMaestro(dto);
  }
}