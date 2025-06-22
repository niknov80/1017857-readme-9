import { Global, Module } from '@nestjs/common';
import { PrismaFileVaultClientService } from './prisma-client.service';

@Global()
@Module({
  providers: [PrismaFileVaultClientService],
  exports: [PrismaFileVaultClientService],
})
export class PrismaFileVaultClientModule {}
