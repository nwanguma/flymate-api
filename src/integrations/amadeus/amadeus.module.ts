import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmadeusService } from './amadeus.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AmadeusService],
  exports: [AmadeusService],
})
export class AmadeusModule {}
