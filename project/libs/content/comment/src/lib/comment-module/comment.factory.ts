import { Injectable } from '@nestjs/common';
import { Comment, EntityFactory } from '@project/core';
import { randomUUID } from 'crypto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  /**
   * Используется репозиториями для восстановления Entity из POJO (из БД или in-memory)
   */
  public create(entityPlainData: Comment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }

  /**
   * Создать новый CommentEntity из CreateCommentDto + authorId
   * @param dto CreateCommentDto
   * @param authorId ID пользователя (authorId)
   * @returns CommentEntity
   */
  public createCommentFromDto(dto: CreateCommentDto, authorId: string): CommentEntity {
    return new CommentEntity({
      id: randomUUID(),
      postId: dto.postId,
      authorId,
      text: dto.text,
      createdAt: new Date(),
    });
  }
}
