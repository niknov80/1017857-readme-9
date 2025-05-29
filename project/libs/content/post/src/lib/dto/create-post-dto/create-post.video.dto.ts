import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { CreatePostBaseDto } from './create-post.base.dto';

export class CreateVideoPostDto extends CreatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Video.Title.Description.Description,
    minLength: PostProperty.Video.Title.Validate.MinLength.Value,
    maxLength: PostProperty.Video.Title.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(PostProperty.Video.Title.Validate.MinLength.Value, {
    message: PostProperty.Video.Title.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Video.Title.Validate.MaxLength.Value, {
    message: PostProperty.Video.Title.Validate.MaxLength.Message,
  })
  @IsNotEmpty()
  public videoTitle: string;

  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Video.Url.Description.Description,
  })
  @IsString()
  @IsUrl()
  @Matches(PostProperty.Video.Url.Validate.RegExp.Value, {
    message: PostProperty.Video.Url.Validate.RegExp.Message,
  })
  public videoUrl: string;
}
