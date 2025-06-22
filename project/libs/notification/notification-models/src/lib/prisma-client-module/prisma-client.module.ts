import { Global, Module } from '@nestjs/common';
import { PrismaNotificationClientService } from './prisma-client.service';

@Global()
@Module({
  providers: [PrismaNotificationClientService],
  exports: [PrismaNotificationClientService],
})
export class PrismaNotificationClientModule {}
