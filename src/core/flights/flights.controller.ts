import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FlightsService } from './flights.service';
import { Flight } from './flight.entity';
import { SaveFlightDto } from './dtos/save-flight.dto';
import { SearchFlightDto } from './dtos/search-flight.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search for flights' })
  @ApiResponse({ status: 200, description: 'Flight search results.' })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  searchFlights(@Query() searchFlightDto: SearchFlightDto) {
    return this.flightsService.searchFlights(searchFlightDto);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Save a flight for future reference' })
  @ApiResponse({
    status: 201,
    description: 'Flight saved successfully.',
    type: Flight,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async saveFlight(@Body() saveFlightDto: SaveFlightDto) {
    return this.flightsService.saveFlight(saveFlightDto);
  }

  @Get('saved')
  @ApiOperation({ summary: 'Retrieve all saved flights' })
  @ApiResponse({
    status: 200,
    description: 'List of saved flights.',
    type: [Flight],
  })
  async getSavedFlights() {
    return this.flightsService.getSavedFlights();
  }
}
