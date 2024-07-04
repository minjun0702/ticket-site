import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
  ) {}

  async creatsShow(createShowDto: CreateShowDto) {
    const newUser = await this.showRepository.save(createShowDto);

    return newUser;
  }

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: [
        'showName',
        'detail',
        'category',
        'region',
        'image',
        'date',
        'time',
        'seat',
        'seatPrice',
      ],
    });
  }

  async findOne(id: number) {
    return await this.verifyTeamById(id);
  }

  private async verifyTeamById(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }
}
