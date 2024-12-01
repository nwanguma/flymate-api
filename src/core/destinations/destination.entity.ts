// src/destinations/destination.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  description: string;

  @Column()
  popularAttractions: string; // Could be a comma-separated list or JSON
}
