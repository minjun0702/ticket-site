import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'show',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  showName: string;

  @Column({ type: 'text', nullable: false })
  detail: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  region: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'simple-json', nullable: false })
  date: string[];

  @Column({ type: 'simple-json', nullable: false })
  time: string[];

  @Column({ type: 'int', nullable: false })
  seat: number;

  @Column({ type: 'int', nullable: false })
  seatPrice: number;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservation: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
