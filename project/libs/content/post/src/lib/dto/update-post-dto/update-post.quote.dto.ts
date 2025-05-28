import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { UpdatePostBaseDto } from './update-post.base.dto';

export class UpdateQuotePostDto extends UpdatePostBaseDto {
  @ApiProperty({
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
  @IsOptional()
  public quoteText: string;

  @ApiProperty({
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
  @IsOptional()
  public quoteAuthor: string;
}
