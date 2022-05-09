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
  getUser(@Query() dto: any) {
    return this.usersService.addUser(dto);
  }
  
}