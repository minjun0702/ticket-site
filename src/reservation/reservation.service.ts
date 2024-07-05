import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ShowService } from 'src/show/show.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private showService: ShowService,
    private showRepository: Repository<Show>,
    private userService: UserService,
  ) {}

  async create(
    user: User,
    showid: number,
    createReservationDto: CreateReservationDto,
  ) {
    const show = await this.showService.findByShow(showid);

    const { date, time } = show;
    if (!date[createReservationDto.date] || !time[createReservationDto.time]) {
      throw new NotFoundException('시간 및 날짜가 존재하지 않습니다.');
    }

    if (show.seatPrice > user.point) {
      throw new NotFoundException('포인트가 부족합니다.');
    }

    //트랜잭션 처리
    //고객 잔액 차감
    // const usesPointDeduction = await this.userService.usesPointDeduction(
    //   user.id,
    //   show.seatPrice,
    // );
    //공연 좌석 차감
    //공연 생성
    return { message: '예약 성공' };
  }

  async findAll() {
    return `This action returns all reservation`;
  }
}
