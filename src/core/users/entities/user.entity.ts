import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Check,
  Unique,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Profile } from '../../profiles/entities/profile.entity';
import { OAuthProvider, UserStatus } from '../users.constants';
import { Notification } from '../../notifications/notifications.entity';

@Entity('users')
@Unique(['email'])
@Check(`"username" IS NULL OR LENGTH("username") >= 3`)
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Primary unique identifier for the user' })
  id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  @Generated('uuid')
  @ApiProperty({ description: 'UUID for the user', format: 'uuid' })
  uuid: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @ApiProperty({
    description: 'Associated profile for the user',
    type: () => Profile,
  })
  profile: Profile;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  @ApiProperty({
    description: 'Username of the user',
    maxLength: 25,
    required: false,
  })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Password for the user', required: false })
  password: string;

  @Column({ type: 'enum', enum: OAuthProvider, nullable: true })
  @ApiProperty({
    description: 'OAuth provider used for authentication',
    enum: OAuthProvider,
    required: false,
  })
  provider: OAuthProvider;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'OAuth provider ID', required: false })
  provider_id: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Access token for OAuth authentication',
    required: false,
  })
  access_token: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Refresh token for OAuth authentication',
    required: false,
  })
  refresh_token: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    description: 'Timestamp when the user was created',
    format: 'date-time',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    format: 'date-time',
  })
  updated_at: Date;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  @ApiProperty({
    description: 'Status of the user account',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status: UserStatus;

  // @OneToMany(() => Notification, (notification) => notification.recipient)
  // @ApiProperty({
  //   description: 'List of notifications associated with the user',
  //   type: () => [Notification],
  // })
  // notifications: Notification[];

  @Column({ type: 'timestamptz', nullable: true })
  @ApiProperty({
    description: "Timestamp of the user's last activity",
    format: 'date-time',
    required: false,
  })
  last_seen: Date;
}
