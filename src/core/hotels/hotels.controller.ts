// src/hotels/hotels.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.entity';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('search')
  async searchHotels(@Query() query: any): Promise<any> {
    return this.hotelsService.searchHotels(query);
  }

  @Post('save')
  async saveHotel(@Body() body: Partial<Hotel>): Promise<Hotel> {
    return this.hotelsService.saveHotel(body);
  }
}
