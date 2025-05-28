import { Expose } from 'class-transformer';
import { BasePostRdo } from './base-post.rdo';

export class TextPostRdo extends BasePostRdo {
  @Expose() textTitle: string;
  @Expose() textAnnouncement: string;
  @Expose() textDescription: string;
}
