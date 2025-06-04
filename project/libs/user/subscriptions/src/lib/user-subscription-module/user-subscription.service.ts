import { Injectable } from '@nestjs/common';
import { BlogUserRepository } from '@project/blog-user';
import { SubscriptionStatus } from '@project/core';
import { PrismaClientService } from '@project/models';
import { UserSubscriptionRepository } from './user-subscription.repository';

@Injectable()
/**
 * Сервис для бизнес-логики подписок.
 * Управляет процессом подписки, отписки и получения информации о подписках.
 */
export class UserSubscriptionService {
  constructor(
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
    private readonly blogUserRepository: BlogUserRepository,
    private readonly client: PrismaClientService,
  ) {}

  /**
   * Подписать одного пользователя на другого.
   * Инкрементируем счётчик только если это новая подписка или была не ACTIVE.
   * Выполняется в транзакции.
   *
   * @param followerUserId - ID подписчика
   * @param followedUserId - ID пользователя, на которого подписываемся
   */
  public async subscribe(followerUserId: string, followedUserId: string): Promise<void> {
    const existing = await this.userSubscriptionRepository.findSubscription(followerUserId, followedUserId);

    await this.client.$transaction([
      this.userSubscriptionRepository.upsertSubscriptionTx(followerUserId, followedUserId),
      ...(!existing || existing.status !== SubscriptionStatus.ACTIVE
        ? [this.blogUserRepository.incrementSubscribersCountTx(followedUserId)]
        : []),
    ]);
  }

  /**
   * Отписать пользователя от другого.
   * Декрементируем счётчик только если была ACTIVE подписка.
   * Выполняется в транзакции.
   *
   * @param followerUserId - ID подписчика
   * @param followedUserId - ID пользователя, от которого отписываемся
   */
  public async unsubscribe(followerUserId: string, followedUserId: string): Promise<void> {
    const updatedCount = await this.userSubscriptionRepository.cancelSubscription(followerUserId, followedUserId);

    await this.client.$transaction([
      this.userSubscriptionRepository.cancelSubscriptionTx(followerUserId, followedUserId),
      ...(updatedCount > 0 ? [this.blogUserRepository.decrementSubscribersCountTx(followedUserId)] : []),
    ]);
  }

  /**
   * Проверить, подписан ли пользователь.
   *
   * @param followerUserId - ID подписчика
   * @param followedUserId - ID пользователя
   * @returns true если подписка ACTIVE, иначе false
   */
  public async isSubscribed(followerUserId: string, followedUserId: string): Promise<boolean> {
    const subscription = await this.userSubscriptionRepository.findSubscription(followerUserId, followedUserId);
    return !!subscription && subscription.status === SubscriptionStatus.ACTIVE;
  }

  /**
   * Получить список ID подписчиков.
   *
   * @param userId - ID пользователя
   * @returns список ID подписчиков
   */
  public async getFollowers(userId: string): Promise<string[]> {
    return this.userSubscriptionRepository.findFollowers(userId);
  }

  /**
   * Получить список ID пользователей, на которых подписан.
   *
   * @param userId - ID пользователя
   * @returns список ID пользователей, на которых подписан
   */
  public async getFollowings(userId: string): Promise<string[]> {
    return this.userSubscriptionRepository.findFollowings(userId);
  }

  /**
   * Получить список подписчиков с полями профиля + признак подписки текущего пользователя.
   *
   * Используется для отображения страницы "Подписчики" с кнопкой "Подписаться / Отписаться".
   *
   * @param targetUserId - ID пользователя, чьих подписчиков нужно получить (на чью страницу смотрим)
   * @param currentUserId - ID текущего пользователя (чтобы определить isSubscribed)
   * @returns массив объектов: { userId, login, publicationsCount, subscribersCount, isSubscribed }
   */
  public async getFollowersWithProfile(
    targetUserId: string,
    currentUserId: string,
  ): Promise<
    Array<{
      userId: string;
      login: string;
      publicationsCount: number;
      subscribersCount: number;
      isSubscribed: boolean;
    }>
  > {
    // Шаг 1: получаем список ID подписчиков
    const followerIds = await this.getFollowers(targetUserId);

    if (followerIds.length === 0) {
      return [];
    }

    // Шаг 2: получаем профиль пользователей
    const users = await this.blogUserRepository.findByIds(followerIds);

    // Шаг 3: получаем подписки текущего пользователя (на кого он подписан)
    const myFollowings = await this.getFollowings(currentUserId);

    const myFollowingsSet = new Set(myFollowings);

    // Шаг 4: собираем итоговый результат
    return users.map((user) => ({
      userId: user.id,
      login: user.login,
      publicationsCount: user.publicationsCount,
      subscribersCount: user.subscribersCount,
      isSubscribed: myFollowingsSet.has(user.id),
    }));
  }
}
