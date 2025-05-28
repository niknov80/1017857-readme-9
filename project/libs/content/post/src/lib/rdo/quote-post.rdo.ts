import { Expose } from 'class-transformer';
import { BasePostRdo } from './base-post.rdo';

export class QuotePostRdo extends BasePostRdo {
  @Expose() quoteText: string;
  @Expose() quoteAuthor: string;
}
