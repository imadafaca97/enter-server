import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { permitsService } from './permits.service';
@Controller('permits')
export class permitsController {
  constructor(private permitsService: permitsService) {}

  @Get('get')
  getall() {
    return this.permitsService.getall();
  }
  @Post('add')
  getUser(@Query() dto: any) {
    return this.permitsService.addPermit(dto);
  }
  
}