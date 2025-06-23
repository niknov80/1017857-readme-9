import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fileVaultConfig from './configurations/file-vault.config';
import postgresConfig from './configurations/postgres.config';

const ENV_FILE_VAULT_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileVaultConfig, postgresConfig],
      envFilePath: ENV_FILE_VAULT_FILE_PATH,
    }),
  ],
})
export class FileVaultConfigModule {}
