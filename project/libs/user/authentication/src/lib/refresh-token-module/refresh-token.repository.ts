import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, RefreshToken> {
  constructor(
    entityFactory: RefreshTokenFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: RefreshTokenEntity): Promise<void> {
    const record = await this.client.refreshToken.create({
      data: {
        tokenId: entity.tokenId,
        createdAt: entity.createdAt,
        expiresIn: entity.expiresIn,
        userId: entity.userId,
      },
    });

    entity.id = record.id;
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const record = await this.client.refreshToken.findFirst({
      where: { tokenId },
    });

    return record ? this.createEntityFromDocument(record) : null;
  }

  public async deleteByTokenId(tokenId: string): Promise<void> {
    await this.client.refreshToken.deleteMany({
      where: { tokenId },
    });
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.client.refreshToken.deleteMany({
      where: {
        expiresIn: { lt: new Date() },
      },
    });
  }
}
