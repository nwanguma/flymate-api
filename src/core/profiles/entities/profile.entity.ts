import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Flight } from '../../flights/flight.entity';
import { Trip } from '../../trips/trip.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Primary unique identifier for the profile' })
  id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  @Generated('uuid')
  @ApiProperty({ description: 'UUID for the profile', format: 'uuid' })
  uuid: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'Associated user for the profile',
    type: () => User,
  })
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({ description: 'First name of the user', maxLength: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({ description: 'Last name of the user', maxLength: 50 })
  last_name: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Avatar URL of the user', required: false })
  avatar: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Location of the user',
    maxLength: 100,
    required: false,
  })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Phone number of the user', required: false })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Short biography of the user', required: false })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Preferred airline of the user',
    required: false,
  })
  preferred_airline: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Frequent flyer number', required: false })
  frequent_flyer_number: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    description: 'Newsletter subscription status',
    default: false,
  })
  newsletter_subscription: boolean;

  @OneToMany(() => Flight, (flight) => flight.profile)
  @ApiProperty({
    description: 'List of saved flights associated with the profile',
    type: () => [Flight],
  })
  savedFlights: Flight[];

  @OneToMany(() => Trip, (trip) => trip.profile)
  @ApiProperty({
    description: 'List of trips associated with the profile',
    type: () => [Trip],
  })
  trips: Trip[];

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    description: 'Timestamp when the profile was created',
    format: 'date-time',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    description: 'Timestamp when the profile was last updated',
    format: 'date-time',
  })
  updated_at: Date;
}
