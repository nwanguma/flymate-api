// src/hotels/hotels.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Hotel } from './hotel.entity';
import { AmadeusService } from '../../integrations/amadeus/amadeus.service';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    private readonly configService: ConfigService,
    private readonly amadeusService: AmadeusService,
  ) {}

  async searchHotels(params: any): Promise<any> {
    const response = await this.amadeusService.searchHotels(params);

    return response.data;
  }

  async saveHotel(data: Partial<Hotel>): Promise<Hotel> {
    const hotel = this.hotelRepository.create(data);
    return this.hotelRepository.save(hotel);
  }
}
