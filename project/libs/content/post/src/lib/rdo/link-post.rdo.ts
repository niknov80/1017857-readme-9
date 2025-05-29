import { Expose } from 'class-transformer';
import { BasePostRdo } from './base-post.rdo';

export class LinkPostRdo extends BasePostRdo {
  @Expose() linkUrl: string;
  @Expose() linkDescription: string | null;
}
