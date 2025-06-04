import { Injectable } from '@nestjs/common';
import { BlogUser, PrismaPromise } from '@prisma/client';
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

  /**
   * Сохранить нового пользователя в базу данных.
   * После сохранения присваивает entity.id.
   *
   * @param entity - сущность пользователя для сохранения
   */
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

  /**
   * Удалить пользователя по ID.
   *
   * @param id - ID пользователя для удаления
   */
  public async deleteById(id: string): Promise<void> {
    await this.client.blogUser.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Обновить данные пользователя.
   *
   * @param entity - сущность пользователя с обновлёнными данными
   */
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

  /**
   * Найти пользователя по ID.
   * Бросает исключение, если пользователь не найден.
   *
   * @param id - ID пользователя для поиска
   * @returns сущность пользователя (BlogUserEntity)
   */
  public async findById(id: string): Promise<BlogUserEntity> {
    const record = await this.client.blogUser.findUniqueOrThrow({
      where: { id },
    });

    return this.createEntityFromDocument(record);
  }

  /**
   * Найти список пользователей по массиву ID.
   *
   * @param ids - массив ID пользователей для поиска
   * @returns массив сущностей пользователей (BlogUserEntity[])
   */
  public async findByIds(ids: string[]): Promise<BlogUserEntity[]> {
    const records = await this.client.blogUser.findMany({
      where: {
        id: { in: ids },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  /**
   * Найти пользователя по email.
   *
   * @param email - email пользователя для поиска
   * @returns сущность пользователя или null, если не найден
   */
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const record = await this.client.blogUser.findUnique({
      where: { email },
    });

    return record ? this.createEntityFromDocument(record) : null;
  }

  /**
   * Увеличить счётчик подписчиков (subscribersCount) на 1.
   * Используется внутри транзакции ($transaction).
   *
   * @param userId - ID пользователя, у которого увеличивается счётчик подписчиков
   * @returns PrismaPromise для использования в транзакции
   */
  public incrementSubscribersCountTx(userId: string): PrismaPromise<BlogUser> {
    return this.client.blogUser.update({
      where: { id: userId },
      data: {
        subscribersCount: { increment: 1 },
      },
    });
  }

  /**
   * Уменьшить счётчик подписчиков (subscribersCount) на 1.
   * Защищено от отрицательных значений (если count > 0).
   * Используется внутри транзакции ($transaction).
   *
   * @param userId - ID пользователя, у которого уменьшается счётчик подписчиков
   * @returns PrismaPromise для использования в транзакции
   */
  public decrementSubscribersCountTx(userId: string): PrismaPromise<{ count: number }> {
    return this.client.blogUser.updateMany({
      where: {
        id: userId,
        subscribersCount: { gt: 0 },
      },
      data: {
        subscribersCount: { decrement: 1 },
      },
    });
  }
}
