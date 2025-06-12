import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dtos/registerRequestDto';
import { Response } from 'express';

@Controller('auth')
export class PassportAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() request, @Res({ passthrough: true }) res: Response) {
    const authResult = await this.authService.generateJwt(request.user);

    //set cookie
    res.cookie('accessToken', authResult.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only over HTTPS in prod
      sameSite: 'lax', // or 'strict' or 'none' (needs HTTPS if 'none')
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return { username: authResult.username, userId: authResult.userId };
  }

  @Post('register')
  async register(@Body() signupData: RegisterRequestDto) {
    return await this.authService.register(signupData);
  }
}
