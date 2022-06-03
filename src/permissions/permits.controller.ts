import { Controller, Post, Query, Body } from '@nestjs/common';
import { permitsService } from './permits.service';
@Controller('permits')
export class permitsController {
  constructor(private permitsService: permitsService) {}

  @Post('get') 
  getall(@Body() dto: any) {
    return this.permitsService.getall(dto); 
  }
  @Post('add')
  getUser(@Query() dto: any) {
    return this.permitsService.addPermit(dto);
  }
  
}