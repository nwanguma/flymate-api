import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { FileUploadService } from './file-uploads.service';
import { FileUploadController } from './file-uploads.controller';

@Module({
  imports: [ConfigModule],
  providers: [
    FileUploadService,
    {
      provide: S3Client,
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region: configService.get<string>('AWS_REGION'),
          credentials: {
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}