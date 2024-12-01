import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Profile } from '../profiles/entities/profile.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the trip' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the trip' })
  name: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Stored flight IDs for the trip, stored as a JSON array',
    example: '["flight1", "flight2"]',
  })
  flights: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Stored hotel IDs for the trip, stored as a JSON array',
    example: '["hotel1", "hotel2"]',
  })
  hotels: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Additional notes for the trip',
    required: false,
  })
  notes: string;

  @ManyToOne(() => Profile, (profile) => profile.trips, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'Profile associated with the trip',
    type: () => Profile,
  })
  profile: Profile;
}
