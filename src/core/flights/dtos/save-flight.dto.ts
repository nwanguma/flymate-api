import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class SaveFlightDto {
  @ApiProperty({
    example: 'JFK',
    description: 'IATA code of the departure airport.',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    example: 'LAX',
    description: 'IATA code of the destination airport.',
  })
  @IsString()
  destination: string;

  @ApiProperty({ example: '2024-07-15', description: 'Departure date.' })
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    example: '2024-07-25',
    description: 'Return date (optional).',
  })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({ example: 350.75, description: 'Price of the flight.' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Delta Airlines', description: 'Airline name.' })
  @IsString()
  airline: string;
}
