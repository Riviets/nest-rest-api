import { Body, Controller, Post, ValidationPipe, Get } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { Prisma } from 'generated/prisma';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @Get('me')
  async me() {
    return this.authService.me();
  }
}
