import { Expose } from 'class-transformer';
import { BasePostRdo } from './base-post.rdo';

export class PhotoPostRdo extends BasePostRdo {
  @Expose() photoId: string;
}
