import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { usersService } from './users.service';
@Controller('users')
export class usersController {
  constructor(private usersService: usersService) {}

  @Get('get')
  getall() {
    return this.usersService.getall();
  }
  @Post('add')
  getUser(@Body() dto: any) {
    return this.usersService.addUser(dto);
  }
  @Post('filterUsers')
  filterUsers(@Body() dto: any) {
    return this.usersService.filterUsers(dto);
  }
  @Post('editUser')
  editUser(@Body() dto: any) {
    return this.usersService.editUser(dto);
  }
  @Post('disableUser')
  disableUser(@Body() dto: any) {
    return this.usersService.disableUser(dto);
  }
  
}