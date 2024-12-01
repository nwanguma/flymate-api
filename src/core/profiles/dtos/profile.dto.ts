import { ApiProperty } from '@nestjs/swagger';

import { Flight } from '../../flights/flight.entity';
import { Trip } from '../../trips/trip.entity';

export class ProfileDto {
  @ApiProperty({ description: 'Unique identifier for the profile' })
  id: number;

  @ApiProperty({ description: 'UUID for the profile' })
  uuid: string;

  @ApiProperty({ description: 'First name of the user' })
  first_name: string;

  @ApiProperty({ description: 'Last name of the user' })
  last_name: string;

  @ApiProperty({ description: 'Avatar URL of the user', required: false })
  avatar: string;

  @ApiProperty({
    description: 'Location of the user',
    maxLength: 100,
    required: false,
  })
  location: string;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  phone: string;

  @ApiProperty({ description: 'Short biography of the user', required: false })
  bio: string;

  @ApiProperty({
    description: 'Preferred airline of the user',
    required: false,
  })
  preferred_airline: string;

  @ApiProperty({ description: 'Frequent flyer number', required: false })
  frequent_flyer_number: string;

  @ApiProperty({
    description: 'Newsletter subscription status',
    default: false,
  })
  newsletter_subscription: boolean;

  @ApiProperty({
    description: 'List of saved flights associated with the profile',
    type: () => [Flight],
  })
  savedFlights: Flight[];

  @ApiProperty({
    description: 'List of trips associated with the profile',
    type: () => [Trip],
  })
  trips: Trip[];

  @ApiProperty({
    description: 'Timestamp when the profile was created',
    format: 'date-time',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the profile was last updated',
    format: 'date-time',
  })
  updated_at: Date;
}
