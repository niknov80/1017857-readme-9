import { Global, Module } from '@nestjs/common';
import { PrismaContentClientService } from './prisma-client.service';

@Global()
@Module({
  providers: [PrismaContentClientService],
  exports: [PrismaContentClientService],
})
export class PrismaContentClientModule {}
