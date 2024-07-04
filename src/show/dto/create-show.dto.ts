import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  showName: string;

  @IsString()
  @IsNotEmpty({ message: '공연 상세 설명을 입력해주세요.' })
  detail: string;

  @IsString()
  @IsNotEmpty({ message: '공연 종류를 입력해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '공연 지역을 입력해주세요.' })
  region: string;

  @IsUrl()
  @IsNotEmpty({ message: '공연 이미지를 등록해주세요.' })
  image: string;

  @IsArray()
  @IsNotEmpty({ message: '날짜를 설정해주세요.' })
  date: string[];

  @IsArray()
  @IsNotEmpty({ message: '시간을 설정해주세요.' })
  time: string[];

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요' })
  seat: number;

  @IsNumber()
  @IsNotEmpty({ message: '좌석 가격을 입력해주세요' })
  seatPrice: number;
}
