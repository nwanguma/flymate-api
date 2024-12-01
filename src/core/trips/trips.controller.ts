import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './trip.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('create')
  async createTrip(@Body() body: Partial<Trip>): Promise<Trip> {
    return this.tripsService.createTrip(body);
  }

  @Get()
  async getTrips(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tripsService.getTrips(Number(page), Number(limit));
  }
}
