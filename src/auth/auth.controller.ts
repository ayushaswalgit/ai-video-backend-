import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() data: CreateUserDto) {
    this.authService.register(data);
  }
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}
