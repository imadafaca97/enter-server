import {  Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IUsersService } from './i-user.service';
@Controller('users')
export class UsersController {
  constructor(@Inject('IUsersService') private readonly _usersService: IUsersService) {}

  @Get()
  async getAll() {
    return await this._usersService.getAll();
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