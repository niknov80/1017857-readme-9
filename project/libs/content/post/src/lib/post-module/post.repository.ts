import { Injectable } from '@nestjs/common';
import { Post, PostStatus, PostType } from '@project/core';
import { BaseMemoryRepository } from '@project/data-access';
import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  constructor(factory: PostFactory) {
    super(factory);
  }

  // 3.1, 3.2, 3.5, 3.6
  public async findAllPublished(
    page = 1,
    limit = 25,
    sortBy: 'date' | 'likes' | 'comments' = 'date',
  ): Promise<PostEntity[]> {
    const raw = [...this.entities.values()].filter((post) => post.status === PostStatus.Published);

    const hydrated: PostEntity[] = await Promise.all(raw.map((post) => this.entityFactory.create(post as Post)));

    const sorted = this.sortPosts(hydrated, sortBy);
    return this.paginate(sorted, page, limit);
  }

  // 3.3, 3.4, 3.5, 3.6
  public async findPublishedByUserId(
    userId: string,
    page = 1,
    limit = 25,
    sortBy: 'date' | 'likes' | 'comments' = 'date',
  ): Promise<PostEntity[]> {
    const raw = [...this.entities.values()].filter(
      (post) => post.userId === userId && post.status === PostStatus.Published,
    );
    const hydrated: PostEntity[] = await Promise.all(raw.map((post) => this.entityFactory.create(post as Post)));

    const sorted = this.sortPosts(hydrated, sortBy);
    const paginated = this.paginate(sorted, page, limit);

    return Promise.all(paginated.map((raw) => this.entityFactory.create(raw)));
  }

  // 3.9
  public async findDraftsByUserId(userId: string): Promise<PostEntity[]> {
    const all = [...this.entities.values()].filter(
      (post) => post.userId === userId && post.status === PostStatus.Draft,
    );

    return Promise.all(all.map((raw) => this.entityFactory.create(raw)));
  }

  // 3.8
  public async findByType(type: PostType, page = 1, limit = 25): Promise<PostEntity[]> {
    const all = [...this.entities.values()].filter(
      (post) => post.type === type && post.status === PostStatus.Published,
    );

    const paginated = this.paginate(all, page, limit);
    return Promise.all(paginated.map((raw) => this.entityFactory.create(raw)));
  }

  // 🔹 3.11
  public async findByTag(tag: string, page = 1, limit = 25): Promise<PostEntity[]> {
    const all = [...this.entities.values()].filter(
      (post) =>
        post.status === PostStatus.Published && Array.isArray(post.tags) && post.tags.includes(tag.toLowerCase()),
    );

    const paginated = this.paginate(all, page, limit);
    return Promise.all(paginated.map((raw) => this.entityFactory.create(raw)));
  }

  // Вспомогательная сортировка
  private sortPosts(posts: PostEntity[], sortBy: 'date' | 'likes' | 'comments') {
    return posts.sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return (b.likeCount ?? 0) - (a.likeCount ?? 0);
        case 'comments':
          return (b.commentCount ?? 0) - (a.commentCount ?? 0);
        case 'date':
        default:
          return b.publicationDate.getTime() - a.publicationDate.getTime();
      }
    });
  }

  // Вспомогательная пагинация
  private paginate<T>(items: T[], page: number, limit: number): T[] {
    const start = (page - 1) * limit;
    return items.slice(start, start + limit);
  }
}
