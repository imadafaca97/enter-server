import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { employeesService } from './employees.service';

@Controller('employees')
export class employeesController {
  constructor(private employeesService: employeesService) {}

  @Get('get')
  getall() {
    return this.employeesService.getall();
  }
  @Get('getById')
  getById(@Query() dto: any) {
    return this.employeesService.getById(dto);
  }
  @Post('add')
  addEmployee(@Query() dto: any) {
    return this.employeesService.addEmployer(dto);
  }
}
