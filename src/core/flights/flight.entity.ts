import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Profile } from '../profiles/entities/profile.entity';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier of the flight.' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'JFK',
    description: 'IATA code of the departure airport.',
  })
  origin: string;

  @Column()
  @ApiProperty({
    example: 'LAX',
    description: 'IATA code of the destination airport.',
  })
  destination: string;

  @Column()
  @ApiProperty({ example: '2024-07-15', description: 'Departure date.' })
  departureDate: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '2024-07-25',
    description: 'Return date (optional).',
  })
  returnDate?: string;

  @Column('decimal')
  @ApiProperty({ example: 350.75, description: 'Price of the flight.' })
  price: number;

  @Column()
  @ApiProperty({ example: 'Delta Airlines', description: 'Airline name.' })
  airline: string;

  @ManyToOne(() => Profile, (profile) => profile.savedFlights, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'Profile associated with the saved flight',
    type: () => Profile, // Ensure this references the Profile entity
  })
  profile: Profile;

  @CreateDateColumn()
  @ApiProperty({
    example: '2024-04-28T12:34:56.789Z',
    description: 'Timestamp when the flight was saved.',
  })
  savedAt: Date;
}
