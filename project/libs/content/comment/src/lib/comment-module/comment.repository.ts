import { Injectable } from '@nestjs/common';
import { PrismaContentClientService } from '@project/content-models';
import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';

/**
 * Репозиторий для работы с комментариями.
 */
@Injectable()
export class CommentRepository {
  constructor(
    private readonly prisma: PrismaContentClientService,
    private readonly commentFactory: CommentFactory,
  ) {}

  /**
   * Сохранить новый комментарий в базу данных.
   * @param comment CommentEntity для сохранения.
   * @returns Сохранённый CommentEntity.
   */
  public async create(comment: CommentEntity): Promise<CommentEntity> {
    const created = await this.prisma.comment.create({
      data: comment.toPOJO(),
    });

    return this.commentFactory.create(created);
  }

  /**
   * Удалить комментарий по id, если authorId совпадает с userId.
   * @param commentId ID комментария.
   * @param userId ID пользователя (должен быть автором).
   */
  public async delete(commentId: string, userId: string): Promise<void> {
    await this.prisma.comment.deleteMany({
      where: {
        id: commentId,
        authorId: userId,
      },
    });
  }

  /**
   * Получить список комментариев к посту с пагинацией.
   * @param postId ID поста.
   * @param page Номер страницы (по умолчанию 1).
   * @param limit Количество на страницу (по умолчанию 50).
   * @returns Список CommentEntity.
   */
  public async findByPost(postId: string, page = 1, limit = 50): Promise<CommentEntity[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return comments.map((comment) => this.commentFactory.create(comment));
  }
}
