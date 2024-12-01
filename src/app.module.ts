import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import databaseConfig from './common/config/database.config';
import redisConfig from './common/config/redis.config';
import { ApiKeyMiddleware } from './common/middleware';
import { FlightsModule } from './core/flights/flights.module';
import { HotelsModule } from './core/hotels/hotels.module';
import { TripsModule } from './core/trips/trips.module';
import { DestinationsModule } from './core/destinations/destinations.module';
import { UsersModule } from './core/users/users.module';
import { ProfilesModule } from './core/profiles/profiles.module';
import { NotificationsModule } from './core/notifications/notifications.module';

@Module({
  imports: [
    // SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig, redisConfig],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.get<string>('database.name'),
          url: configService.get<string>('database.url'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: process.env.NODE_ENV === 'development',
          cache: {
            duration: 60000,
          },
          // logging: true,
        };
      },
    }),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     level: 'info',
    //     transport: {
    //       target: 'pino-pretty',
    //       options: {
    //         colorize: true,
    //         translateTime: 'SYS:standard',
    //         ignore: 'pid,hostname',
    //       },
    //     },
    //   },
    // }),
    FlightsModule,
    HotelsModule,
    TripsModule,
    DestinationsModule,
    UsersModule,
    ProfilesModule,
    NotificationsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
