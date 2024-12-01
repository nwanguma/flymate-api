import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../users/entities/user.entity';
import { Profile } from '../profiles/entities/profile.entity';
import {
  NotificationTypes,
  NotificationCategories,
} from './notifications.constant';
import { Trip } from '../trips/trip.entity';
import { Flight } from '../flights/flight.entity';
import { ResourceTypes } from '../../common/constants/index.constants';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the notification' })
  id: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  @ApiProperty({ description: 'Unique UUID for the notification' })
  uuid: string;

  // @ManyToOne(() => User, { onDelete: 'CASCADE' })
  // @ApiProperty({ description: 'The user who initiated the notification' })
  // initiator: User;

  // @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'recipient_id' })
  // @ApiProperty({ description: 'The recipient of the notification' })
  // recipient: User;

  @Column({
    type: 'enum',
    enum: NotificationTypes,
    array: true,
  })
  @ApiProperty({
    description:
      'The types of notifications (e.g., flight updates, trip reminders)',
    enum: NotificationTypes,
    isArray: true,
  })
  type: NotificationTypes[];

  @Column({
    type: 'enum',
    enum: ResourceTypes,
  })
  @ApiProperty({
    description: 'The types of resources users can get notifications for/of',
    enum: ResourceTypes,
    isArray: true,
  })
  resource_type: ResourceTypes;

  @Column({
    type: 'enum',
    enum: NotificationCategories,
  })
  @ApiProperty({
    description: 'The category of the notification (e.g., Travel)',
    enum: NotificationCategories,
  })
  category: NotificationCategories;

  @Column({ default: false })
  @ApiProperty({ description: 'Indicates if the notification has been read' })
  is_read: boolean;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Content or message of the notification' })
  content: string;

  @ManyToOne(() => Profile, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  @ApiProperty({
    description:
      "The profile associated with the notification, typically the user's travel profile",
    type: () => Profile,
    nullable: true,
  })
  profile: Profile;

  @ManyToOne(() => Trip, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trip_id' })
  @ApiProperty({
    description:
      'Trip related to the notification (e.g., trip update or reminder)',
    type: () => Trip,
    nullable: true,
  })
  trip: Trip;

  @ManyToOne(() => Flight, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flight_id' })
  @ApiProperty({
    description:
      'Flight related to the notification (e.g., flight delay or status update)',
    type: () => Flight,
    nullable: true,
  })
  flight: Flight;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the notification was created',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the notification was last updated',
  })
  updated_at: Date;
}
