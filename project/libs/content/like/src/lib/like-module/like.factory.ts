import { Injectable } from '@nestjs/common';
import { EntityFactory, Like } from '@project/core';
import { randomUUID } from 'crypto';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeFactory implements EntityFactory<LikeEntity> {
  /**
   * Используется репозиториями для восстановления Entity из POJO (из БД или in-memory)
   */
  public create(entityPlainData: Like): LikeEntity {
    return new LikeEntity(entityPlainData);
  }

  /**
   * Создать новый LikeEntity.
   * @param postId ID поста.
   * @param userId ID пользователя.
   * @returns LikeEntity.
   */
  public createNew(postId: string, userId: string): LikeEntity {
    return new LikeEntity({
      id: randomUUID(),
      postId,
      userId,
      createdAt: new Date(),
    });
  }
}
