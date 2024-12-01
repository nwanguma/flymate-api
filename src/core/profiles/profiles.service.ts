import { CreateUpdateProfileDto } from './dtos/create-update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NotFoundException,
  Logger,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, In } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';

export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async getOneProfile(currentUserProfileId: string, profileId: string) {
    const profile = await this.profilesRepository.findOne({
      where: { uuid: profileId },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    return profile;
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.profilesRepository.findOne({
      where: { user: { uuid: userId } },
      relations: ['user'],
    });

    return profile;
  }

  async getProfilesByUserIds(userIds: string[]) {
    const profiles = await this.profilesRepository.find({
      where: {
        user: { uuid: In(userIds) },
      },
    });

    return profiles;
  }

  async getProfilesByProfileIds(profileIds: string[]) {
    const profiles = await this.profilesRepository.find({
      where: {
        uuid: In(profileIds),
      },
    });

    return profiles;
  }

  async updateProfile(
    profileId: string,
    dto: Partial<CreateUpdateProfileDto>,
    userProfile: Profile,
  ) {
    if (userProfile.uuid !== profileId) throw new ForbiddenException();

    const profile = await this.profilesRepository.findOne({
      where: { uuid: profileId },
      relations: ['user'],
    });

    if (!profile) {
      throw new BadRequestException('Profile update failed');
    }

    const savedProfile = await this.profilesRepository.save(profile);

    return savedProfile;
  }
}
