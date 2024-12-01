import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { CreateUpdateProfileDto } from './dtos/create-update-profile.dto';
import { CustomSerializerInterceptor } from '../../common/interceptors/transform.interceptor';
import { ProfileDto } from './dtos/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Profile } from './entities/profile.entity';
import { GetCurrentUser } from './../../common/decorators/current-user.decorator';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new CustomSerializerInterceptor(ProfileDto))
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new CustomSerializerInterceptor(ProfileDto))
  async getOneProfile(
    @GetCurrentUser('profile') profile: Profile,
    @Param('id') id: string,
  ) {
    return await this.profilesService.getOneProfile(profile.uuid, id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new CustomSerializerInterceptor(ProfileDto))
  async updateProfile(
    @GetCurrentUser('profile') profile: Profile,
    @Param('id') id: string,
    @Body() dto: CreateUpdateProfileDto,
  ) {
    return await this.profilesService.updateProfile(id, dto, profile);
  }
}
