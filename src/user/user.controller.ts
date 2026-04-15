import { Controller, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { Body, Get, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getprofile(@Req() req) {
    return req.user;
  }
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
