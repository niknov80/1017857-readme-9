import { Injectable } from '@nestjs/common';
import { PrismaContentClientService } from '@project/content-models';
import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';

/**
 * Репозиторий для работы с лайками.
 */
@Injectable()
export class LikeRepository {
  constructor(
    private readonly prisma: PrismaContentClientService,
    private readonly likeFactory: LikeFactory,
  ) {}

  /**
   * Сохранить новый лайк.
   * @param like LikeEntity.
   * @returns LikeEntity.
   */
  public async create(like: LikeEntity): Promise<LikeEntity> {
    const created = await this.prisma.like.create({
      data: like.toPOJO(),
    });

    return this.likeFactory.create(created);
  }

  /**
   * Удалить лайк (dislike).
   * @param postId ID поста.
   * @param userId ID пользователя.
   */
  public async delete(postId: string, userId: string): Promise<void> {
    await this.prisma.like.deleteMany({
      where: {
        postId,
        userId,
      },
    });
  }

  /**
   * Проверить — есть ли лайк.
   * @param postId ID поста.
   * @param userId ID пользователя.
   * @returns true если лайк есть.
   */
  public async exists(postId: string, userId: string): Promise<boolean> {
    const like = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    return !!like;
  }

  /**
   * Получить лайк (если есть).
   * @param postId ID поста.
   * @param userId ID пользователя.
   * @returns LikeEntity или кидает ошибку если нет.
   */
  public async get(postId: string, userId: string): Promise<LikeEntity> {
    const like = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (!like) {
      throw new Error(`Like not found for postId=${postId}, userId=${userId}`);
    }

    return this.likeFactory.create(like);
  }
}
