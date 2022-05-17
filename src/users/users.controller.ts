import {  Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IUsersService } from './i-user.service';
@Controller('users')
export class UsersController {
  constructor(@Inject('IUsersService') private readonly _usersService: IUsersService) {}

  @Get()
  async getAll() {
    return await this._usersService.getAll();
  }
  @Post()
  getUser(@Query() dto: any) {
    return this._usersService.addUser(dto);
  }
  
}