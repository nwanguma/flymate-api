import { ApiProperty } from '@nestjs/swagger';

import {
  NotificationTypes,
  NotificationCategories,
} from '../notifications.constant';
import { ResourceTypes } from '../../../common/constants/index.constants';
import { User } from '../../users/entities/user.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { Trip } from '../../trips/trip.entity';
import { Flight } from '../../flights/flight.entity';

export class NotificationDto {
  @ApiProperty({ description: 'Unique identifier for the notification' })
  id: string;

  @ApiProperty({ description: 'Unique UUID for the notification' })
  uuid: string;

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
  type: NotificationTypes[];

  @ApiProperty({
    description: 'The types of resources users can get notifications for/of',
    enum: ResourceTypes,
    isArray: true,
  })
  resource_type: ResourceTypes;

  @ApiProperty({
    description: 'The category of the notification (e.g., Travel)',
    enum: NotificationCategories,
  })
  category: NotificationCategories;

  @ApiProperty({ description: 'Indicates if the notification has been read' })
  is_read: boolean;

  @ApiProperty({
    description: 'Content or message of the notification',
    required: false,
  })
  content: string;

  @ApiProperty({
    description:
      "The profile associated with the notification, typically the user's travel profile",
    type: () => Profile,
    nullable: true,
  })
  profile: Profile;

  @ApiProperty({
    description:
      'Trip related to the notification (e.g., trip update or reminder)',
    type: () => Trip,
    nullable: true,
  })
  trip: Trip;

  @ApiProperty({
    description:
      'Flight related to the notification (e.g., flight delay or status update)',
    type: () => Flight,
    nullable: true,
  })
  flight: Flight;

  @ApiProperty({
    description: 'The date and time when the notification was created',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date and time when the notification was last updated',
  })
  updated_at: Date;
}
