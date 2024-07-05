import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  // 공연 등록 => 팀등록
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async createshow(@Body() createShowDto: CreateShowDto) {
    return await this.showService.creatsShow(createShowDto);
  }

  // 공연 목록 전체보기
  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  // 공연 목록 카테고리별 보기
  @Get('/category/:category')
  async findByCategory(@Param('category') category: string) {
    return await this.showService.findByCategory(category);
  }

  // 공연 검색하기
  @Get('/search/:name')
  async findByName(@Param('name') name: string) {
    return await this.showService.findByName(name);
  }

  // 공연 상세보기 => FINDONE
  @Get('/detail/:id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }
}
