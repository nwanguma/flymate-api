import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Destination } from './destination.entity';
import { AmadeusService } from '../../integrations/amadeus/amadeus.service';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly amadeusService: AmadeusService,
  ) {}

  async getDestinationDetails(city: string): Promise<any> {
    const response = await this.amadeusService.getDestinationDetails(city);

    return response.data;
  }

  async saveDestination(data: Partial<Destination>): Promise<Destination> {
    const destination = this.destinationRepository.create(data);
    return this.destinationRepository.save(destination);
  }

  async getDestinations(): Promise<Destination[]> {
    return this.destinationRepository.find();
  }
}
