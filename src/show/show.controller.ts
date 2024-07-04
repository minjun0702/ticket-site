import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  // 공연 등록 => 팀등록
  @Roles(Role.Admin)
  @Post()
  async createshow(@Body() createShowDto: CreateShowDto) {
    return await this.showService.creatsShow(createShowDto);
  }

  // 공연 목록 보기 => 팀 조회
  @Get()
  async findAll() {
    return await this.showService.findAll();
  }
  // 공연 검색하기 => ?

  // 공연 상세보기 => FINDONE
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }
}
