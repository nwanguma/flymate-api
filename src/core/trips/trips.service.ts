// src/trips/trips.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
  ) {}

  async createTrip(data: Partial<Trip>): Promise<Trip> {
    const trip = this.tripRepository.create(data);
    return this.tripRepository.save(trip);
  }

  async getTrips(
    page: number,
    limit: number,
  ): Promise<{ data: Trip[]; total: number }> {
    const [result, total] = await this.tripRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: result,
      total,
    };
  }
}
