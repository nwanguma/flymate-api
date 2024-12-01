import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AmadeusService } from '../../integrations/amadeus/amadeus.service';
import { Flight } from './flight.entity';
import { SaveFlightDto } from './dtos/save-flight.dto';
import { CacheService } from '../../utils/cache/cache.service';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly cacheService: CacheService,
    private readonly amadeusService: AmadeusService,
  ) {}

  async searchFlights(params: any): Promise<any> {
    const response = await this.amadeusService.searchFlights(params);
    const cacheKey = 'placeholder';

    await this.cacheService.set(cacheKey, response.data, 600);
    return response.data;
  }

  async saveFlight(saveFlightDto: SaveFlightDto): Promise<Flight> {
    const flight = this.flightRepository.create(saveFlightDto);
    return await this.flightRepository.save(flight);
  }

  async getSavedFlights(): Promise<Flight[]> {
    return await this.flightRepository.find();
  }
}
