import { Test, TestingModule } from '@nestjs/testing';
import { FlightsService } from './flights.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Flight } from './flight.entity';
import { SaveFlightDto } from './dtos/save-flight.dto';

const mockFlight = {
  id: 1,
  origin: 'JFK',
  destination: 'LAX',
  departureDate: '2024-07-15',
  returnDate: '2024-07-25',
  price: 350.75,
  airline: 'Delta Airlines',
  savedAt: new Date(),
};

describe('FlightsService', () => {
  let service: FlightsService;
  let repository: Repository<Flight>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightsService,
        {
          provide: getRepositoryToken(Flight),
          useValue: {
            create: jest.fn().mockReturnValue(mockFlight),
            save: jest.fn().mockResolvedValue(mockFlight),
            find: jest.fn().mockResolvedValue([mockFlight]),
          },
        },
      ],
    }).compile();

    service = module.get<FlightsService>(FlightsService);
    repository = module.get<Repository<Flight>>(getRepositoryToken(Flight));
  });

  it('should save a flight', async () => {
    const saveFlightDto: SaveFlightDto = {
      origin: 'JFK',
      destination: 'LAX',
      departureDate: '2024-07-15',
      returnDate: '2024-07-25',
      price: 350.75,
      airline: 'Delta Airlines',
    };
    const result = await service.saveFlight(saveFlightDto);
    expect(repository.create).toHaveBeenCalledWith(saveFlightDto);
    expect(repository.save).toHaveBeenCalledWith(mockFlight);
    expect(result).toEqual(mockFlight);
  });

  it('should retrieve all saved flights', async () => {
    const result = await service.getSavedFlights();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockFlight]);
  });
});
