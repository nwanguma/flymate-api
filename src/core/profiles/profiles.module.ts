import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User]), NotificationsModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
