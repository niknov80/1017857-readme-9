import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';

/**
 * Сервис для работы с комментариями.
 */
@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
  ) {}

  /**
   * Создать новый комментарий.
   * @param dto CreateCommentDto.
   * @param userId ID пользователя (автора).
   * @returns Сохранённый CommentEntity.
   */
  public async create(dto: CreateCommentDto, userId: string): Promise<CommentEntity> {
    const comment = this.commentFactory.createCommentFromDto(dto, userId);
    return this.commentRepository.create(comment);
  }

  /**
   * Удалить комментарий по id, если автор совпадает с userId.
   * @param commentId ID комментария.
   * @param userId ID пользователя (автора).
   */
  public async delete(commentId: string, userId: string): Promise<void> {
    await this.commentRepository.delete(commentId, userId);
  }

  /**
   * Получить список комментариев к посту с пагинацией.
   * @param postId ID поста.
   * @param page Номер страницы (по умолчанию 1).
   * @param limit Количество на страницу (по умолчанию 50).
   * @returns Список CommentEntity.
   */
  public async findByPost(postId: string, page = 1, limit = 50): Promise<CommentEntity[]> {
    return this.commentRepository.findByPost(postId, page, limit);
  }
}
