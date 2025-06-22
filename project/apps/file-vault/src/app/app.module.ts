import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@project/config';
import { FileUploaderModule } from '@project/file-uploader';
import { FileVaultConfigModule } from '@project/file-vault-config';
import { PrismaFileVaultClientModule } from '@project/file-vault-models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['libs/file-vault/file-vault-models/.env', 'apps/file-vault/file-vault.env', '.env'],
      isGlobal: true,
      load: [jwtConfig],
    }),
    PrismaFileVaultClientModule,
    FileVaultConfigModule,
    FileUploaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
