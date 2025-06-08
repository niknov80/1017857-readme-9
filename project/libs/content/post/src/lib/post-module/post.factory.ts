import { Injectable } from '@nestjs/common';
import { EntityFactory, Post, PostStatus, PostType } from '@project/core';
import { randomUUID } from 'crypto';
import { CreatePostDto } from '../dto/create-post-dto/create-post.dto';
import { CreateLinkPostDto } from '../dto/create-post-dto/create-post.link.dto';
import { CreatePhotoPostDto } from '../dto/create-post-dto/create-post.photo.dto';
import { CreateQuotePostDto } from '../dto/create-post-dto/create-post.quote.dto';
import { CreateTextPostDto } from '../dto/create-post-dto/create-post.text.dto';
import { CreateVideoPostDto } from '../dto/create-post-dto/create-post.video.dto';
import { UpdatePostDto } from '../dto/update-post-dto/update-post.dto';
import { UpdateLinkPostDto } from '../dto/update-post-dto/update-post.link.dto';
import { UpdatePhotoPostDto } from '../dto/update-post-dto/update-post.photo.dto';
import { UpdateQuotePostDto } from '../dto/update-post-dto/update-post.quote.dto';
import { UpdateTextPostDto } from '../dto/update-post-dto/update-post.text.dto';
import { UpdateVideoPostDto } from '../dto/update-post-dto/update-post.video.dto';
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

  public updatePostFromDto(post: PostEntity, dto: UpdatePostDto): PostEntity {
    const methods: Record<PostType, (post: PostEntity, dto: UpdatePostDto) => PostEntity> = {
      [PostType.Video]: (post, dto) => this.updateVideo(post, dto as UpdateVideoPostDto),
      [PostType.Text]: (post, dto) => this.updateText(post, dto as UpdateTextPostDto),
      [PostType.Photo]: (post, dto) => this.updatePhoto(post, dto as UpdatePhotoPostDto),
      [PostType.Quote]: (post, dto) => this.updateQuote(post, dto as UpdateQuotePostDto),
      [PostType.Link]: (post, dto) => this.updateLink(post, dto as UpdateLinkPostDto),
    };

    return methods[post.type](post, dto);
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

  private updateVideo(post: PostEntity, dto: UpdateVideoPostDto): PostEntity {
    return new PostEntity({
      id: post.id,
      type: post.type,
      status: dto.status ? (dto.status as PostStatus) : post.status,
      publicationDate: dto.publicationDate ?? post.publicationDate,
      createdAt: post.createdAt,
      tags: dto.tags ?? post.tags,
      userId: post.userId,

      isRepost: post.isRepost,
      repostId: post.repostId,
      repostUserId: post.repostUserId,

      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      repostCount: post.repostCount,

      videoTitle: dto.videoTitle ?? post.videoTitle,
      videoUrl: dto.videoUrl ?? post.videoUrl,

      textTitle: post.textTitle,
      textAnnouncement: post.textAnnouncement,
      textDescription: post.textDescription,

      quoteText: post.quoteText,
      quoteAuthor: post.quoteAuthor,

      photoId: post.photoId,

      linkUrl: post.linkUrl,
      linkDescription: post.linkDescription,
    });
  }

  private updateText(post: PostEntity, dto: UpdateTextPostDto): PostEntity {
    return new PostEntity({
      id: post.id,
      type: post.type,
      status: dto.status ? (dto.status as PostStatus) : post.status,
      publicationDate: dto.publicationDate ?? post.publicationDate,
      createdAt: post.createdAt,
      tags: dto.tags ?? post.tags,
      userId: post.userId,

      isRepost: post.isRepost,
      repostId: post.repostId,
      repostUserId: post.repostUserId,

      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      repostCount: post.repostCount,

      videoTitle: post.videoTitle,
      videoUrl: post.videoUrl,

      textTitle: dto.textTitle ?? post.textTitle,
      textAnnouncement: dto.textAnnouncement ?? post.textAnnouncement,
      textDescription: dto.textDescription ?? post.textDescription,

      quoteText: post.quoteText,
      quoteAuthor: post.quoteAuthor,

      photoId: post.photoId,

      linkUrl: post.linkUrl,
      linkDescription: post.linkDescription,
    });
  }

  private updatePhoto(post: PostEntity, dto: UpdatePhotoPostDto): PostEntity {
    return new PostEntity({
      id: post.id,
      type: post.type,
      status: dto.status ? (dto.status as PostStatus) : post.status,
      publicationDate: dto.publicationDate ?? post.publicationDate,
      createdAt: post.createdAt,
      tags: dto.tags ?? post.tags,
      userId: post.userId,

      isRepost: post.isRepost,
      repostId: post.repostId,
      repostUserId: post.repostUserId,

      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      repostCount: post.repostCount,

      videoTitle: post.videoTitle,
      videoUrl: post.videoUrl,

      textTitle: post.textTitle,
      textAnnouncement: post.textAnnouncement,
      textDescription: post.textDescription,

      quoteText: post.quoteText,
      quoteAuthor: post.quoteAuthor,

      photoId: dto.photoId ?? post.photoId,

      linkUrl: post.linkUrl,
      linkDescription: post.linkDescription,
    });
  }

  private updateQuote(post: PostEntity, dto: UpdateQuotePostDto): PostEntity {
    return new PostEntity({
      id: post.id,
      type: post.type,
      status: dto.status ? (dto.status as PostStatus) : post.status,
      publicationDate: dto.publicationDate ?? post.publicationDate,
      createdAt: post.createdAt,
      tags: dto.tags ?? post.tags,
      userId: post.userId,

      isRepost: post.isRepost,
      repostId: post.repostId,
      repostUserId: post.repostUserId,

      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      repostCount: post.repostCount,

      videoTitle: post.videoTitle,
      videoUrl: post.videoUrl,

      textTitle: post.textTitle,
      textAnnouncement: post.textAnnouncement,
      textDescription: post.textDescription,

      quoteText: dto.quoteText ?? post.quoteText,
      quoteAuthor: dto.quoteAuthor ?? post.quoteAuthor,

      photoId: post.photoId,

      linkUrl: post.linkUrl,
      linkDescription: post.linkDescription,
    });
  }

  private updateLink(post: PostEntity, dto: UpdateLinkPostDto): PostEntity {
    return new PostEntity({
      id: post.id,
      type: post.type,
      status: dto.status ? (dto.status as PostStatus) : post.status,
      publicationDate: dto.publicationDate ?? post.publicationDate,
      createdAt: post.createdAt,
      tags: dto.tags ?? post.tags,
      userId: post.userId,

      isRepost: post.isRepost,
      repostId: post.repostId,
      repostUserId: post.repostUserId,

      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      repostCount: post.repostCount,

      videoTitle: post.videoTitle,
      videoUrl: post.videoUrl,

      textTitle: post.textTitle,
      textAnnouncement: post.textAnnouncement,
      textDescription: post.textDescription,

      quoteText: post.quoteText,
      quoteAuthor: post.quoteAuthor,

      photoId: post.photoId,

      linkUrl: dto.linkUrl ?? post.linkUrl,
      linkDescription: dto.linkDescription ?? post.linkDescription,
    });
  }
}
