import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateUpdateProfileDto {
  @ApiProperty({ description: 'First name of the user', maxLength: 50 })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name of the user', maxLength: 50 })
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Avatar URL of the user', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'Location of the user',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Short biography of the user', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'Preferred airline of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  preferred_airline?: string;

  @ApiProperty({ description: 'Frequent flyer number', required: false })
  @IsOptional()
  @IsString()
  frequent_flyer_number?: string;

  @ApiProperty({
    description: 'Newsletter subscription status',
    default: false,
  })
  @IsBoolean()
  newsletter_subscription: boolean;
}
