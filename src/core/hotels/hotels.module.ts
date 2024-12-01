import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.entity';
import { AmadeusModule } from '../../integrations/amadeus/amadeus.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), AmadeusModule],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
