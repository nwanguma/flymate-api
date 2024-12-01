import { Test, TestingModule } from '@nestjs/testing';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
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

describe('FlightsController', () => {
  let controller: FlightsController;
  let service: FlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightsController],
      providers: [
        {
          provide: FlightsService,
          useValue: {
            saveFlight: jest.fn().mockResolvedValue(mockFlight),
            getSavedFlights: jest.fn().mockResolvedValue([mockFlight]),
          },
        },
      ],
    }).compile();

    controller = module.get<FlightsController>(FlightsController);
    service = module.get<FlightsService>(FlightsService);
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

    const result = await controller.saveFlight(saveFlightDto);
    expect(service.saveFlight).toHaveBeenCalledWith(saveFlightDto);
    expect(result).toEqual(mockFlight);
  });

  it('should retrieve all saved flights', async () => {
    const result = await controller.getSavedFlights();
    expect(service.getSavedFlights).toHaveBeenCalled();
    expect(result).toEqual([mockFlight]);
  });
});
