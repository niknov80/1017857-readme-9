import { UpdateLinkPostDto } from './update-post.link.dto';
import { UpdatePhotoPostDto } from './update-post.photo.dto';
import { UpdateQuotePostDto } from './update-post.quote.dto';
import { UpdateTextPostDto } from './update-post.text.dto';
import { UpdateVideoPostDto } from './update-post.video.dto';

export type UpdatePostDto =
  | UpdateVideoPostDto
  | UpdateTextPostDto
  | UpdateQuotePostDto
  | UpdatePhotoPostDto
  | UpdateLinkPostDto;
