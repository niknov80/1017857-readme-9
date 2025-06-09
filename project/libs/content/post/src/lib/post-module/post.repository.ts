import { Injectable } from '@nestjs/common';
import { PrismaContentClientService } from '@project/content-models';
import { Post, PostStatus, PostType } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostStatus as PrismaPostStatus, PostType as PrismaPostType } from '.prisma/content-client';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post, PrismaContentClientService> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaContentClientService,
  ) {
    super(entityFactory, client);
  }

  /**
   * Сохранить новый пост в базу данных.
   */
  public async save(entity: PostEntity): Promise<void> {
    await this.client.post.create({
      data: {
        id: entity.id,
        type: entity.type as unknown as PrismaPostType,
        status: entity.status as unknown as PrismaPostStatus,
        publicationDate: entity.publicationDate,
        createdAt: entity.createdAt,
        tags: entity.tags ?? [],
        userId: entity.userId,
        isRepost: entity.isRepost,
        repostId: entity.repostId,
        repostUserId: entity.repostUserId,
        viewCount: entity.viewCount,
        likeCount: entity.likeCount,
        commentCount: entity.commentCount,
        repostCount: entity.repostCount,
        videoTitle: entity.videoTitle,
        videoUrl: entity.videoUrl,
        textTitle: entity.textTitle,
        textAnnouncement: entity.textAnnouncement,
        textDescription: entity.textDescription,
        quoteText: entity.quoteText,
        quoteAuthor: entity.quoteAuthor,
        photoId: entity.photoId,
        linkUrl: entity.linkUrl,
        linkDescription: entity.linkDescription,
      },
    });
  }

  /**
   * Удалить пост по ID.
   */
  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Обновить данные поста.
   */
  public async update(entity: PostEntity): Promise<void> {
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        type: entity.type as unknown as PrismaPostType,
        status: entity.status as unknown as PrismaPostStatus,
        publicationDate: entity.publicationDate,
        tags: entity.tags ?? [],
        isRepost: entity.isRepost,
        repostId: entity.repostId,
        repostUserId: entity.repostUserId,
        viewCount: entity.viewCount,
        likeCount: entity.likeCount,
        commentCount: entity.commentCount,
        repostCount: entity.repostCount,
        videoTitle: entity.videoTitle,
        videoUrl: entity.videoUrl,
        textTitle: entity.textTitle,
        textAnnouncement: entity.textAnnouncement,
        textDescription: entity.textDescription,
        quoteText: entity.quoteText,
        quoteAuthor: entity.quoteAuthor,
        photoId: entity.photoId,
        linkUrl: entity.linkUrl,
        linkDescription: entity.linkDescription,
      },
    });
  }

  /**
   * Найти пост по ID.
   */
  public async findById(id: string): Promise<PostEntity> {
    const record = await this.client.post.findUniqueOrThrow({
      where: { id },
    });

    return this.createEntityFromDocument({
      ...record,
      type: record.type as unknown as PostEntity['type'],
      status: record.status as unknown as PostEntity['status'],
    });
  }

  /**
   * Находит все опубликованные посты.
   * Выполняет пункты ТЗ: 3.1, 3.2, 3.5, 3.6
   */
  public async findAllPublished(
    page = 1,
    limit = 25,
    sortBy: 'date' | 'likes' | 'comments' = 'date',
  ): Promise<PostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        status: PostStatus.Published,
      },
      orderBy: this.getOrderBy(sortBy),
      skip: (page - 1) * limit,
      take: limit,
    });

    return records.map((record) =>
      this.createEntityFromDocument({
        ...record,
        type: record.type as unknown as PostEntity['type'],
        status: record.status as unknown as PostEntity['status'],
      }),
    );
  }

  /**
   * Находит все опубликованные посты пользователя по userId.
   * Выполняет пункты ТЗ: 3.3, 3.4, 3.5, 3.6
   */
  public async findPublishedByUserId(
    userId: string,
    page = 1,
    limit = 25,
    sortBy: 'date' | 'likes' | 'comments' = 'date',
  ): Promise<PostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        userId,
        status: PostStatus.Published,
      },
      orderBy: this.getOrderBy(sortBy),
      skip: (page - 1) * limit,
      take: limit,
    });

    return records.map((record) =>
      this.createEntityFromDocument({
        ...record,
        type: record.type as unknown as PostEntity['type'],
        status: record.status as unknown as PostEntity['status'],
      }),
    );
  }

  /**
   * Находит черновики постов пользователя по userId.
   * Выполняет пункт ТЗ: 3.9
   */
  public async findDraftsByUserId(userId: string): Promise<PostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        userId,
        status: PostStatus.Draft,
      },
    });

    return records.map((record) =>
      this.createEntityFromDocument({
        ...record,
        type: record.type as unknown as PostEntity['type'],
        status: record.status as unknown as PostEntity['status'],
      }),
    );
  }

  /**
   * Находит опубликованные посты по типу.
   * Выполняет пункт ТЗ: 3.8
   */
  public async findByType(type: PostType, page = 1, limit = 25): Promise<PostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        type: type as unknown as PrismaPostType,
        status: PostStatus.Published,
      },
      orderBy: {
        publicationDate: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return records.map((record) =>
      this.createEntityFromDocument({
        ...record,
        type: record.type as unknown as PostEntity['type'],
        status: record.status as unknown as PostEntity['status'],
      }),
    );
  }

  /**
   * Находит опубликованные посты по тегу.
   * Выполняет пункт ТЗ: 3.11
   */
  public async findByTag(tag: string, page = 1, limit = 25): Promise<PostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        status: PostStatus.Published,
        tags: {
          has: tag.toLowerCase(),
        },
      },
      orderBy: {
        publicationDate: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return records.map((record) =>
      this.createEntityFromDocument({
        ...record,
        type: record.type as unknown as PostEntity['type'],
        status: record.status as unknown as PostEntity['status'],
      }),
    );
  }

  /**
   * Вспомогательная функция для сортировки.
   */
  private getOrderBy(sortBy: 'date' | 'likes' | 'comments'): {
    publicationDate?: 'asc' | 'desc';
    likeCount?: 'asc' | 'desc';
    commentCount?: 'asc' | 'desc';
  } {
    const sorts = {
      likes: { likeCount: 'desc' },
      comments: { commentCount: 'desc' },
      default: { publicationDate: 'desc' },
    };
    return sorts[sortBy] ?? sorts.default;
  }
}
