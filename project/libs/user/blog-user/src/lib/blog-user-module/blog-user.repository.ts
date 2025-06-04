import { Injectable } from '@nestjs/common';
import { AuthUser } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BasePostgresRepository<BlogUserEntity, AuthUser> {
  constructor(
    entityFactory: BlogUserFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogUserEntity): Promise<void> {
    const record = await this.client.blogUser.create({
      data: {
        passwordHash: entity.passwordHash,
        email: entity.email,
        login: entity.login,
        avatar: entity.avatar ?? '',
        createdAt: entity.createdAt,
        publicationsCount: entity.publicationsCount,
        subscribersCount: entity.subscribersCount,
      },
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.blogUser.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: BlogUserEntity): Promise<void> {
    await this.client.blogUser.update({
      where: { id: entity.id },
      data: {
        email: entity.email,
        login: entity.login,
        avatar: entity.avatar ?? '',
        publicationsCount: entity.publicationsCount,
        subscribersCount: entity.subscribersCount,
      },
    });
  }

  public async findById(id: string): Promise<BlogUserEntity> {
    const record = await this.client.blogUser.findUniqueOrThrow({
      where: { id },
    });

    return this.createEntityFromDocument(record);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const record = await this.client.blogUser.findUnique({
      where: { email },
    });

    return record ? this.createEntityFromDocument(record) : null;
  }
}
