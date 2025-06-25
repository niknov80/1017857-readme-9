import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtOptions } from '@project/config';
import { PrismaNotificationClientModule } from '@project/notification-models';
import { MailModule } from '../mail-module/mail.module';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { MailingController } from './mailing.controller';
import { MailingFactory } from './mailing.factory';
import { MailingRepository } from './mailing.repository';
import { MailingService } from './mailing.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    MailModule,
    PrismaNotificationClientModule,
  ],
  controllers: [MailingController],
  providers: [MailingService, MailingRepository, MailingFactory, JwtAccessStrategy],
})
export class MailingModule {}
