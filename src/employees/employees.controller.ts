import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { employeesService } from './employees.service';

@Controller('employees')
export class employeesController {
  constructor(private employeesService: employeesService) {}

  @Get('get')
  getall() {
    return this.employeesService.getall();
  }
  @Post('add')
  addEmployee(@Query() dto: any) {
    return this.employeesService.addEmployee(dto);
  }

  @Post('update')
  updateEmployee(@Query() dto: any) {
    return this.employeesService.updateEmployee(dto);
  }
}
