// src/destinations/destinations.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { Destination } from './destination.entity';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get('details')
  async getDestinationDetails(@Query('city') city: string): Promise<any> {
    return this.destinationsService.getDestinationDetails(city);
  }

  @Post('save')
  async saveDestination(
    @Body() body: Partial<Destination>,
  ): Promise<Destination> {
    return this.destinationsService.saveDestination(body);
  }

  @Get()
  async getDestinations(): Promise<Destination[]> {
    return this.destinationsService.getDestinations();
  }
}
