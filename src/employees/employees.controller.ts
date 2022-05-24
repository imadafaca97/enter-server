import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
  @Get('getEntries')
  getgetEntriesById(@Query() dto: any) {
    return this.employeesService.getEntries(dto);
  }

  @Post('getEntriesByProvince')
  getEntriesByProvince(@Body() dto: any) {
    return this.employeesService.getEntriesbyProvince(dto);
  }
  
  @Post('add')
  addEmployee(@Body() dto: any) {
    return this.employeesService.addEmployer(dto);
  }
  @Post('employeeEntry')
  employeEntry(@Body() dto: any) {
    return this.employeesService.employeEntry(dto);
  }
  @Post('filterEmployees')
  filterEmployees(@Body() dto: string) {
    return this.employeesService.filterEmployees(dto);
  }

  @Delete('deleteAll')
  deleteAll(){
    return this.employeesService.deleteAll();
  }
}
