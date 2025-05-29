import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { UserConfigModule } from '@project/config';

@Module({
  imports: [BlogUserModule, AuthenticationModule, UserConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
