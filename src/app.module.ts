import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [UserModule, ShowModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
