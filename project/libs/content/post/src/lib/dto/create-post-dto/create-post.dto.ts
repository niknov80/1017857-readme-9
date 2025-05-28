import { CreateLinkPostDto } from './create-post.link.dto';
import { CreatePhotoPostDto } from './create-post.photo.dto';
import { CreateQuotePostDto } from './create-post.quote.dto';
import { CreateTextPostDto } from './create-post.text.dto';
import { CreateVideoPostDto } from './create-post.video.dto';

export type CreatePostDto =
  | CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto;
