import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { IsEmail } from 'class-validator';
import { MESSAGE } from '../message';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //회원 가입
  async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (checkUser) {
      throw new ConflictException(`이미 가입된 email입니다.`);
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    // 패스워드를 제외하고 사용자 정보 저장
    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    //  JWT 토큰 생성
    const payload = { id: newUser.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    return {
      message: MESSAGE.SIGN_UP.SUCCEED,
      data: { ...newUser, password: undefined },
      accessToken,
    };
  }

  async singIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (_.isNil(user) || !(await compare(password, user.password))) {
      throw new UnauthorizedException('이메일 및 비밀번호를 확인해주세요.');
    }

    // if (!(await compare(password, user.password))) {
    //   throw new UnauthorizedException('비밀번호를 확인해주세요.');
    // }

    const payload = { email, sub: user.id };
    return {
      message: '로그인에 성공하였습니다.',
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async usesPointDeduction(userid: number, seatPrice: number) {
    const user = await this.userRepository.findOne({ where: { id: userid } });
    user.point -= seatPrice;
    await this.userRepository.save(user);
  }
}
