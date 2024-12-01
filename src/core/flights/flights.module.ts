import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { AmadeusModule } from '../../integrations/amadeus/amadeus.module';
import { CacheServiceModule } from './../../utils/cache/cache.module';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { Flight } from './flight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight]),
    AmadeusModule,
    CacheServiceModule,
    HttpModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
