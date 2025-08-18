import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(
    @Body(ValidationPipe) signInDTO: SignInDTO,
    @Req() req: Request,
  ) {
    return this.authService.signIn(signInDTO, req.session);
  }

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return this.authService.me(req.session);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    return this.authService.logout(req.session);
  }
}
