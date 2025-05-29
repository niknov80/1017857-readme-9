import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { CreatePostBaseDto } from './create-post.base.dto';

export class CreateQuotePostDto extends CreatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Quote.Text.Description.Description,
    minLength: PostProperty.Quote.Text.Validate.MinLength.Value,
    maxLength: PostProperty.Quote.Text.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(PostProperty.Quote.Text.Validate.MinLength.Value, {
    message: PostProperty.Quote.Text.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Quote.Text.Validate.MaxLength.Value, {
    message: PostProperty.Quote.Text.Validate.MaxLength.Message,
  })
  @IsNotEmpty()
  public quoteText: string;

  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Quote.Author.Description.Description,
    minLength: PostProperty.Quote.Author.Validate.MinLength.Value,
    maxLength: PostProperty.Quote.Author.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(PostProperty.Quote.Author.Validate.MinLength.Value, {
    message: PostProperty.Quote.Author.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Quote.Author.Validate.MaxLength.Value, {
    message: PostProperty.Quote.Author.Validate.MaxLength.Message,
  })
  @IsNotEmpty()
  public quoteAuthor: string;
}
