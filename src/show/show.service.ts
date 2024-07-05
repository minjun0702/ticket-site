import _ from 'lodash';
import { Like, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateShowDto } from './dto/create-show.dto';

import { Show } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
  ) {}

  // 공연 생성
  async creatsShow(createShowDto: CreateShowDto) {
    const newShow = await this.showRepository.save(createShowDto);

    return { message: '공연 생성에 성공하였습니다.', data: newShow };
  }

  // 공연 전체 조회
  async findAll(): Promise<{ message: string; data: Show[] }> {
    const data: Show[] = await this.showRepository.find({});
    return {
      message: '목록 조회에 성공하였습니다.',
      data,
    };
  }

  //공연 카테고리별 조회
  async findByCategory(
    category: string,
  ): Promise<{ message: string; data: Show[] }> {
    const data: Show[] = await this.showRepository.find({
      where: { category },
    });
    return {
      message: `공연 종류 '${category}'의 공연 목록 조회에 성공하였습니다.`,
      data,
    };
  }

  //공연 이름 조회
  async findByName(name: string): Promise<{ message: string; data: Show[] }> {
    const data: Show[] = await this.showRepository.find({
      where: { showName: Like(`%${name}%`) },
    });
    return {
      message: `'공연 이름 ${name}'의 공연 목록 조회에 성공하였습니다.`,
      data,
    };
  }
  // 공연 상세조회
  async findOne(id: number) {
    const show = await this.showRepository.findOne({ where: { id } });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    let reservaiontCheck;
    if (show.seat <= 0) {
      reservaiontCheck = '예매 불가';
    } else {
      reservaiontCheck = '예매 가능';
    }

    return {
      message: '상세 조회에 성공하였습니다',
      reservaion: reservaiontCheck,
      show,
    };
  }

  async findByShow(showid: number) {
    const show = await this.showRepository.findOneBy({ id: showid });
    return show;
  }
}
