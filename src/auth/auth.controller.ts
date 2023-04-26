import { LocalAuthGuard } from '@/common/guards';
import { CreateUserDto } from '@/users/dto/createUser.dto';
import RequestWithUser from '@/utils/requestWithUser.interface';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private isDevelopment: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    this.isDevelopment =
      this.config.get('NODE_ENV') === 'development' ? true : false;
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    const accessToken = this.authService.getJwt(user.id);

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: this.isDevelopment ? 'lax' : 'strict',
        secure: this.isDevelopment ? false : true,
        expires: new Date(Date.now() + 30 * 60 * 1000),
      })
      .send({ status: 'login successfully' });
  }

  @Post('register')
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.register(userDto);

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: this.isDevelopment ? 'lax' : 'strict',
        secure: this.isDevelopment ? false : true,
        expires: new Date(Date.now() + 30 * 60 * 1000),
      })
      .send({ status: 'login successfully' });
  }

  @Get('profile')
  getProfile() {
    return;
  }
}
