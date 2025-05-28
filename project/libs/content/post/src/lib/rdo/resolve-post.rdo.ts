import { PostType } from '@project/core';
import { PostEntity } from '../post-module/post.entity';
import { BasePostRdo } from './base-post.rdo';
import { LinkPostRdo } from './link-post.rdo';
import { PhotoPostRdo } from './photo-post.rdo';
import { QuotePostRdo } from './quote-post.rdo';
import { TextPostRdo } from './text-post.rdo';
import { VideoPostRdo } from './video-post.rdo';

export function resolvePostRdo(post: PostEntity): new () => BasePostRdo {
  switch (post.type) {
    case PostType.Video:
      return VideoPostRdo;
    case PostType.Text:
      return TextPostRdo;
    case PostType.Quote:
      return QuotePostRdo;
    case PostType.Link:
      return LinkPostRdo;
    case PostType.Photo:
      return PhotoPostRdo;
    default:
      return BasePostRdo;
  }
}
