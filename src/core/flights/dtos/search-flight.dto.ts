// src/flights/dto/search-flight.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchFlightDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  departureDate: string;

  @IsOptional()
  @IsString()
  returnDate?: string;
}
