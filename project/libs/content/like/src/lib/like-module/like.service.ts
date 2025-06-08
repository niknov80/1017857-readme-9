import { Injectable } from '@nestjs/common';
import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';
import { LikeRepository } from './like.repository';

/**
 * Сервис для работы с лайками.
 */
@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly likeFactory: LikeFactory,
  ) {}

  /**
   * Поставить лайк на пост (идемпотентно).
   * @param postId ID поста.
   * @param userId ID пользователя.
   * @returns LikeEntity.
   */
  public async like(postId: string, userId: string): Promise<LikeEntity> {
    const exists = await this.likeRepository.exists(postId, userId);

    if (exists) {
      // Лайк уже стоит — возвращаем текущий
      return await this.likeRepository.get(postId, userId);
    }

    // Лайка нет — создаём
    const like = this.likeFactory.createNew(postId, userId);
    return this.likeRepository.create(like);
  }

  /**
   * Убрать лайк с поста.
   * @param postId ID поста.
   * @param userId ID пользователя.
   */
  public async dislike(postId: string, userId: string): Promise<void> {
    await this.likeRepository.delete(postId, userId);
  }

  /**
   * Проверить — есть ли лайк.
   * @param postId ID поста.
   * @param userId ID пользователя.
   * @returns true если лайк есть.
   */
  public async isLiked(postId: string, userId: string): Promise<boolean> {
    return this.likeRepository.exists(postId, userId);
  }
}
