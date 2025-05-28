import { PostStatus, PostType } from '@project/core';
import { Expose } from 'class-transformer';

export class BasePostRdo {
  @Expose() id: string;
  @Expose() type: PostType;
  @Expose() status: PostStatus;
  @Expose() publicationDate: Date;
  @Expose() tags: string[] | null;
  @Expose() isRepost: boolean;
  @Expose() viewCount: number;
  @Expose() likeCount: number;
  @Expose() commentCount: number;
  @Expose() repostCount: number;
}
