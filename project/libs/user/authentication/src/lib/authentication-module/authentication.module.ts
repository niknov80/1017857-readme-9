import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BlogUserModule } from '@project/blog-user';
import { getJwtOptions } from '@project/config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { NotifyModule } from '@project/notify';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthenticationModule {}
