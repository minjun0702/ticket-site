import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty({ message: '날짜를 입력해주세요.' })
  @Min(0, { message: '유효한 날짜를 입력해주세요.' })
  date: number;

  @IsInt()
  @IsNotEmpty({ message: '시간을 설정해주세요.' })
  @Min(0, { message: '유효한 시간을 입력해주세요.' })
  time: number;
}
