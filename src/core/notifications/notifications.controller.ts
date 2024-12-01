import {
  Controller,
  Query,
  Post,
  Param,
  Get,
  Put,
  UseGuards,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { NotificationsService } from './notifications.service';
import { GetCurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CustomSerializerInterceptor } from '../../common/interceptors/transform.interceptor';
import { CacheService } from '../../utils/cache/cache.service';
import { NotificationDto } from './dtos/notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly cacheService: CacheService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Put(':id/read')
  @UseGuards(JwtAuthGuard)
  async markAsRead(@Param('id') id: string) {
    await this.notificationsService.markAsRead(id);
  }

  @Get('long-poll')
  @UseGuards(JwtAuthGuard)
  async longPolling(
    @GetCurrentUser('uuid') userId: string,
    @Res() res: Response,
  ) {
    const timeout = 25000;
    const pollingInterval = 5000;

    let hasNewNotifications = false;

    const latestSentNotificationsTimestampCacheKey = `user_${userId}_latest_notification_time`;
    const latestSentNotificationsTimestampCacheData =
      await this.cacheService.get(latestSentNotificationsTimestampCacheKey);

    let pollingTimeoutId: NodeJS.Timeout;

    const checkForNewNotifications = async () => {
      try {
        const notificationsData =
          await this.notificationsService.getUserNotificationsLongPoll(userId);

        let checkHasNewNotifications = false;

        if (notificationsData.data.length > 0) {
          const latestNotificationTimeStamp = new Date(
            notificationsData.data[0].created_at,
          ).getTime();

          checkHasNewNotifications =
            !latestSentNotificationsTimestampCacheData ||
            latestNotificationTimeStamp !==
              latestSentNotificationsTimestampCacheData;
        }

        if (checkHasNewNotifications) {
          const latestNotificationTimeStamp = new Date(
            notificationsData.data[0].created_at,
          ).getTime();

          hasNewNotifications = true;

          await this.cacheService.set(
            latestSentNotificationsTimestampCacheKey,
            latestNotificationTimeStamp,
          );

          if (pollingTimeoutId) clearTimeout(pollingTimeoutId);

          return res.json({
            ...notificationsData,
            data: notificationsData?.data
              ?.filter((notification) => {
                return (
                  new Date(notification.created_at).getTime() >=
                  latestNotificationTimeStamp
                );
              })
              .map((notification) => notification.uuid),
            messages: [],
          });
        }

        pollingTimeoutId = setTimeout(
          checkForNewNotifications,
          pollingInterval,
        );
      } catch (error) {
        console.error('Error checking notifications:', error);
        return res
          .status(500)
          .json({ message: 'An error occurred during polling.' });
      }
    };

    checkForNewNotifications();

    const endTimeoutId = setTimeout(() => {
      if (!hasNewNotifications) {
        if (pollingTimeoutId) clearTimeout(pollingTimeoutId);

        res.json({ data: [], messages: [], total: 0 });
      }

      clearTimeout(endTimeoutId);
    }, timeout);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new CustomSerializerInterceptor(NotificationDto))
  async getUserNotifications(
    @GetCurrentUser('uuid') userId: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.notificationsService.getUserNotifications(userId, page, limit);
  }
}
