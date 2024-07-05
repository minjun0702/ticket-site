import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/sign-in')
  async singIn(@Body() loginUserDto: LoginDto) {
    return await this.userService.singIn(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async profile(@UserInfo() user: User) {
    return {
      message: '내 정보 조회에 성공하였습니다.',
      data: { ...user, password: undefined },
    };
  }
}
