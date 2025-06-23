import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dtos/registerRequestDto';
import { Response } from 'express';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { AuthenticatedRequest } from 'src/types';

@Controller('auth')
export class PassportAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() signupData: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authResult = await this.authService.register(signupData);

    //set cookie
    res.cookie('accessToken', authResult.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only over HTTPS in prod
      sameSite: 'none', // or 'strict' or 'none' (needs HTTPS if 'none')
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return { username: authResult.username, userId: authResult.userId };
    // return await this.authService.register(signupData);
  }

  @Post('login')
  @UseGuards(PassportLocalGuard)

  //@Res({ passthrough: true }) allows you to process the response object manually (e.g. set a cookie), but still allow Nest to automatically send the final response
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

  @UseGuards(PassportJwtAuthGuard)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    //without passthrough, I must manuall send response
    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(PassportJwtAuthGuard)
  @Get('check')
  findUser(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
