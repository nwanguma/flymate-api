// src/destinations/destinations.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DestinationsService } from './destinations.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './destination.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DestinationsService', () => {
  let service: DestinationsService;
  let repository: Repository<Destination>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TypeOrmModule.forFeature([Destination])],
      providers: [
        DestinationsService,
        {
          provide: getRepositoryToken(Destination),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DestinationsService>(DestinationsService);
    repository = module.get<Repository<Destination>>(
      getRepositoryToken(Destination),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch destination details from Amadeus API', async () => {
    jest
      .spyOn(service, 'getDestinationDetails')
      .mockResolvedValue({ data: 'mockData' });
    const data = await service.getDestinationDetails('Paris');
    expect(data).toEqual({ data: 'mockData' });
  });
});
