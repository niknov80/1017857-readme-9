import { Injectable } from '@nestjs/common';
import { PrismaPromise, SubscriptionStatus as PrismaSubscriptionStatus, UserSubscription } from '@prisma/client';
import { SubscriptionStatus } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { UserSubscriptionEntity } from './user-subscription.entity';
import { UserSubscriptionFactory } from './user-subscription.factory';

@Injectable()
/**
 * Репозиторий для подписок (UserSubscription).
 * Отвечает только за доступ к данным.
 * Бизнес-логика (инкременты и т.п.) выносится в Service.
 */
export class UserSubscriptionRepository extends BasePostgresRepository<UserSubscriptionEntity, UserSubscription> {
  constructor(
    entityFactory: UserSubscriptionFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  /**
   * Найти подписку между двумя пользователями.
   *
   * @param followerUserId - ID подписчика
   * @param followedUserId - ID пользователя, на которого подписываются
   * @returns Подписка или null
   */
  public async findSubscription(followerUserId: string, followedUserId: string): Promise<UserSubscription | null> {
    const record = await this.client.userSubscription.findUnique({
      where: {
        followerUserId_followedUserId: {
          followerUserId,
          followedUserId,
        },
      },
    });

    return record
      ? {
          id: record.id,
          followerUserId: record.followerUserId,
          followedUserId: record.followedUserId,
          createdAt: record.createdAt,
          status: record.status as SubscriptionStatus,
        }
      : null;
  }

  /**
   * Создать или активировать подписку.
   * Если подписка уже есть — обновляем статус на ACTIVE.
   * Если нет — создаём новую.
   *
   * @param followerUserId - ID подписчика
   * @param followedUserId - ID пользователя, на которого подписываются
   */
  public async upsertSubscription(followerUserId: string, followedUserId: string): Promise<void> {
    await this.client.userSubscription.upsert({
      where: {
        followerUserId_followedUserId: {
          followerUserId,
          followedUserId,
        },
      },
      update: {
        status: SubscriptionStatus.ACTIVE,
      },
      create: {
        followerUserId,
        followedUserId,
        status: SubscriptionStatus.ACTIVE,
      },
    });
  }

  /**
   * Отменить подписку (перевести в статус CANCELLED).
   *
   * @param followerUserId - ID подписчика
   * @param followedUserId - ID пользователя, от которого отписываются
   * @returns Количество обновлённых записей (0 или 1)
   */
  public async cancelSubscription(followerUserId: string, followedUserId: string): Promise<number> {
    const result = await this.client.userSubscription.updateMany({
      where: {
        followerUserId,
        followedUserId,
        status: SubscriptionStatus.ACTIVE,
      },
      data: {
        status: SubscriptionStatus.CANCELLED,
      },
    });

    return result.count;
  }

  /**
   * Получить список ID пользователей, которые подписаны на данного пользователя.
   *
   * @param userId - ID пользователя
   * @returns Массив ID подписчиков
   */
  public async findFollowers(userId: string): Promise<string[]> {
    const records = await this.client.userSubscription.findMany({
      where: {
        followedUserId: userId,
        status: SubscriptionStatus.ACTIVE,
      },
      select: {
        followerUserId: true,
      },
    });

    return records.map((record) => record.followerUserId);
  }

  /**
   * Получить список ID пользователей, на которых подписан данный пользователь.
   *
   * @param userId - ID пользователя
   * @returns Массив ID пользователей, на которых подписан
   */
  public async findFollowings(userId: string): Promise<string[]> {
    const records = await this.client.userSubscription.findMany({
      where: {
        followerUserId: userId,
        status: SubscriptionStatus.ACTIVE,
      },
      select: {
        followedUserId: true,
      },
    });

    return records.map((record) => record.followedUserId);
  }

  /**
   * Создать или активировать подписку (статус ACTIVE).
   * Используется внутри транзакции ($transaction).
   *
   * @param followerUserId - ID пользователя, который подписывается
   * @param followedUserId - ID пользователя, на которого подписываются
   * @returns PrismaPromise для использования в транзакции
   */
  public upsertSubscriptionTx(followerUserId: string, followedUserId: string): PrismaPromise<UserSubscription> {
    return this.client.userSubscription.upsert({
      where: {
        followerUserId_followedUserId: {
          followerUserId,
          followedUserId,
        },
      },
      update: {
        status: PrismaSubscriptionStatus.ACTIVE,
      },
      create: {
        followerUserId,
        followedUserId,
        status: PrismaSubscriptionStatus.ACTIVE,
      },
    });
  }

  /**
   * Отменить подписку (перевести в статус CANCELLED).
   * Используется внутри транзакции ($transaction).
   *
   * @param followerUserId - ID пользователя, который отписывается
   * @param followedUserId - ID пользователя, от которого отписываются
   * @returns PrismaPromise для использования в транзакции
   */
  public cancelSubscriptionTx(followerUserId: string, followedUserId: string): PrismaPromise<{ count: number }> {
    return this.client.userSubscription.updateMany({
      where: {
        followerUserId,
        followedUserId,
        status: PrismaSubscriptionStatus.ACTIVE,
      },
      data: {
        status: PrismaSubscriptionStatus.CANCELLED,
      },
    });
  }
}
