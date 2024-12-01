import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import {
  NotificationTypes,
  NotificationCategories,
} from '../notifications.constant';
import { ResourceTypes } from '../../../common/constants/index.constants';
import { User } from '../../users/entities/user.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { Trip } from '../../trips/trip.entity';
import { Flight } from '../../flights/flight.entity';

export class CreateNotificationDto {
  @ApiProperty({ description: 'The user who initiated the notification' })
  initiator: User;

  @ApiProperty({ description: 'The recipient of the notification' })
  recipient: User;

  @ApiProperty({
    description:
      'The types of notifications (e.g., flight updates, trip reminders)',
    enum: NotificationTypes,
    isArray: true,
  })
  @IsArray()
  @IsEnum(NotificationTypes, { each: true })
  type: NotificationTypes[];

  @ApiProperty({ description: 'The id of the recipient of the notification' })
  @IsOptional()
  @IsString()
  recipient_id?: string;

  @ApiProperty({
    description: 'The types of resources users can get notifications for/of',
    enum: ResourceTypes,
  })
  @IsEnum(ResourceTypes)
  resource_type: ResourceTypes;

  @ApiProperty({
    description: 'The category of the notification (e.g., Travel)',
    enum: NotificationCategories,
  })
  @IsEnum(NotificationCategories)
  category: NotificationCategories;

  @ApiProperty({
    description: 'Indicates if the notification has been read',
    default: false,
  })
  @IsBoolean()
  is_read: boolean;

  @ApiProperty({
    description: 'Content or message of the notification',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description:
      "The profile associated with the notification, typically the user's travel profile",
    type: () => Profile,
    nullable: true,
  })
  @IsOptional()
  profile?: Profile;

  @ApiProperty({
    description:
      'Trip related to the notification (e.g., trip update or reminder)',
    type: () => Trip,
    nullable: true,
  })
  @IsOptional()
  trip?: Trip;

  @ApiProperty({
    description:
      'Flight related to the notification (e.g., flight delay or status update)',
    type: () => Flight,
    nullable: true,
  })
  @IsOptional()
  flight?: Flight;
}
