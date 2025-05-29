import { Injectable } from '@nestjs/common';
import { EntityFactory, Post, PostStatus, PostType } from '@project/core';
import { randomUUID } from 'crypto';
import { CreatePostDto } from '../dto/create-post-dto/create-post.dto';
import { CreateLinkPostDto } from '../dto/create-post-dto/create-post.link.dto';
import { CreatePhotoPostDto } from '../dto/create-post-dto/create-post.photo.dto';
import { CreateQuotePostDto } from '../dto/create-post-dto/create-post.quote.dto';
import { CreateTextPostDto } from '../dto/create-post-dto/create-post.text.dto';
import { CreateVideoPostDto } from '../dto/create-post-dto/create-post.video.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  /**
   * Используется репозиториями для восстановления Entity из POJO (из БД или in-memory)
   */
  public create(entityPlainData: Post): PostEntity {
    return new PostEntity(entityPlainData);
  }

  public createPostFromDto(dto: CreatePostDto, userId: string): PostEntity {
    const methods: Record<PostType, (dto: CreatePostDto, userId: string) => PostEntity> = {
      [PostType.Video]: (dto, userId) => this.createFromVideo(dto as CreateVideoPostDto, userId),
      [PostType.Text]: (dto, userId) => this.createFromText(dto as CreateTextPostDto, userId),
      [PostType.Photo]: (dto, userId) => this.createFromPhoto(dto as CreatePhotoPostDto, userId),
      [PostType.Quote]: (dto, userId) => this.createFromQuote(dto as CreateQuotePostDto, userId),
      [PostType.Link]: (dto, userId) => this.createFromLink(dto as CreateLinkPostDto, userId),
    };

    return methods[dto.type](dto, userId);
  }

  private baseInit<T extends { status: PostStatus; publicationDate: Date; tags?: string[] | null }>(
    dto: T,
    userId: string,
  ) {
    return {
      id: randomUUID(),
      status: dto.status,
      publicationDate: dto.publicationDate,
      createdAt: new Date(),
      tags: dto.tags ?? [],
      userId,
      isRepost: false,
      repostId: null,
      repostUserId: null,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      repostCount: 0,
    };
  }

  private createFromVideo(dto: CreateVideoPostDto, userId: string): PostEntity {
    return new PostEntity({
      ...this.baseInit(dto, userId),
      type: PostType.Video,
      videoTitle: dto.videoTitle,
      videoUrl: dto.videoUrl,
      textTitle: null,
      textAnnouncement: null,
      textDescription: null,
      quoteText: null,
      quoteAuthor: null,
      linkUrl: null,
      linkDescription: null,
      photoId: null,
    });
  }

  private createFromText(dto: CreateTextPostDto, userId: string): PostEntity {
    return new PostEntity({
      ...this.baseInit(dto, userId),
      type: PostType.Text,
      textTitle: dto.textTitle,
      textAnnouncement: dto.textAnnouncement,
      textDescription: dto.textDescription,
      videoTitle: null,
      videoUrl: null,
      quoteText: null,
      quoteAuthor: null,
      linkUrl: null,
      linkDescription: null,
      photoId: null,
    });
  }

  private createFromQuote(dto: CreateQuotePostDto, userId: string): PostEntity {
    return new PostEntity({
      ...this.baseInit(dto, userId),
      type: PostType.Quote,
      quoteText: dto.quoteText,
      quoteAuthor: dto.quoteAuthor,
      videoTitle: null,
      videoUrl: null,
      textTitle: null,
      textAnnouncement: null,
      textDescription: null,
      linkUrl: null,
      linkDescription: null,
      photoId: null,
    });
  }

  private createFromPhoto(dto: CreatePhotoPostDto, userId: string): PostEntity {
    return new PostEntity({
      ...this.baseInit(dto, userId),
      type: PostType.Photo,
      photoId: dto.photoId,
      videoTitle: null,
      videoUrl: null,
      textTitle: null,
      textAnnouncement: null,
      textDescription: null,
      quoteText: null,
      quoteAuthor: null,
      linkUrl: null,
      linkDescription: null,
    });
  }

  private createFromLink(dto: CreateLinkPostDto, userId: string): PostEntity {
    return new PostEntity({
      ...this.baseInit(dto, userId),
      type: PostType.Link,
      linkUrl: dto.linkUrl,
      linkDescription: dto.linkDescription ?? null,
      videoTitle: null,
      videoUrl: null,
      textTitle: null,
      textAnnouncement: null,
      textDescription: null,
      quoteText: null,
      quoteAuthor: null,
      photoId: null,
    });
  }
}
