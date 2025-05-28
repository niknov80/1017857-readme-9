import { Entity, Post, PostStatus, PostType, StorableEntity } from '@project/core';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public status: PostStatus;

  public tags: string[] | null;
  public userId: string;

  public publicationDate: Date;
  public createdAt: Date;

  public isRepost: boolean;
  public repostId: string | null;
  public repostUserId: string | null;

  public viewCount: number | null;
  public likeCount: number | null;
  public commentCount: number | null;
  public repostCount: number | null;

  public videoTitle: string | null;
  public videoUrl: string | null;

  public textTitle: string | null;
  public textAnnouncement: string | null;
  public textDescription: string | null;

  public quoteText: string | null;
  public quoteAuthor: string | null;

  public photoId: string | null;

  public linkUrl: string | null;
  public linkDescription: string | null;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) return;

    this.id = post.id ?? '';

    this.type = post.type;
    this.status = post.status;

    this.publicationDate = post.publicationDate;
    this.createdAt = post.createdAt;

    this.tags = post.tags;
    this.userId = post.userId;

    this.isRepost = post.isRepost;
    this.repostId = post.repostId;
    this.repostUserId = post.repostUserId;

    this.commentCount = post.commentCount;
    this.likeCount = post.likeCount;
    this.viewCount = post.viewCount;
    this.repostCount = post.repostCount;

    this.videoTitle = post.videoTitle;
    this.videoUrl = post.videoUrl;

    this.textTitle = post.textTitle;
    this.textAnnouncement = post.textAnnouncement;
    this.textDescription = post.textDescription;

    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;

    this.photoId = post.photoId;

    this.linkUrl = post.linkUrl;
    this.linkDescription = post.linkDescription;
  }

  toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      status: this.status,

      publicationDate: this.publicationDate,
      createdAt: this.createdAt,

      tags: this.tags,
      userId: this.userId,

      isRepost: this.isRepost,
      repostId: this.repostId ?? null,
      repostUserId: this.repostUserId ?? null,

      commentCount: this.commentCount,
      likeCount: this.likeCount,
      viewCount: this.viewCount,
      repostCount: this.repostCount,

      videoTitle: this.videoTitle ?? null,
      videoUrl: this.videoUrl ?? null,

      textTitle: this.textTitle ?? null,
      textAnnouncement: this.textAnnouncement ?? null,
      textDescription: this.textDescription ?? null,

      quoteText: this.quoteText ?? null,
      quoteAuthor: this.quoteAuthor ?? null,

      photoId: this.photoId ?? null,

      linkUrl: this.linkUrl ?? null,
      linkDescription: this.linkDescription ?? null,
    };
  }
}
