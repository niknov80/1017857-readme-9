import { PostType } from '@project/core';
import { ClassConstructor } from 'class-transformer';
import { PostEntity } from '../post-module/post.entity';
import { BasePostRdo } from './base-post.rdo';
import { LinkPostRdo } from './link-post.rdo';
import { PhotoPostRdo } from './photo-post.rdo';
import { QuotePostRdo } from './quote-post.rdo';
import { TextPostRdo } from './text-post.rdo';
import { VideoPostRdo } from './video-post.rdo';

export function resolvePostRdo(post: PostEntity): new () => BasePostRdo {
  const rdos: Record<PostType, ClassConstructor<BasePostRdo>> = {
    [PostType.Video]: VideoPostRdo,
    [PostType.Text]: TextPostRdo,
    [PostType.Quote]: QuotePostRdo,
    [PostType.Link]: LinkPostRdo,
    [PostType.Photo]: PhotoPostRdo,
  };
  return rdos[post.type];
}
