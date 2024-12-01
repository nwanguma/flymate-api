import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Destination } from './destination.entity';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { AmadeusModule } from 'src/integrations/amadeus/amadeus.module';

@Module({
  imports: [TypeOrmModule.forFeature([Destination]), AmadeusModule],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
