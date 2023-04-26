import { CreateUserDto } from '@/users/dto/createUser.dto';
import { UserDto } from '@/users/dto/user.dto';
import { UsersService } from '@/users/users.service';
import { TokenPayload } from '@/utils/types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.usersService.getByEmail(userDto.email);
    if (!user) throw new NotFoundException("User's email does not exist");

    await this.verifyPassword(userDto.password, user.password);
    delete user.password;
    return user;
  }

  async register(userDto: CreateUserDto) {
    const saltRounds = 10;

    const existedUser = this.usersService.getByEmail(userDto.email);
    if (existedUser)
      throw new BadRequestException("email's user already existed");

    const hash = await bcrypt.hash(userDto.password, saltRounds);
    const user = await this.usersService.create({
      ...userDto,
      password: hash,
    });

    const accessToken = this.getJwt(user.id);
    return accessToken;
  }

  getJwt(userId: string) {
    const payload: TokenPayload = { userId };
    return this.jwtService.sign(payload);
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
