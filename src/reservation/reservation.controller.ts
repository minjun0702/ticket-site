import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserInfo } from 'src/utils/userInfo.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 공연 예매하기
  @Post('/:showid')
  async create(
    @Param('showid') showid: number,
    @UserInfo() user: User,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    console.log(showid);
    return this.reservationService.create(user, showid, createReservationDto);
  }

  // 예매 확인하기
  @Get('/me')
  findAll() {
    return this.reservationService.findAll();
  }
}
