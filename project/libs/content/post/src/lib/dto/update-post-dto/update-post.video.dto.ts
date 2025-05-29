import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { UpdatePostBaseDto } from './update-post.base.dto';

export class UpdateVideoPostDto extends UpdatePostBaseDto {
  @ApiProperty({
    type: String,
    description: PostProperty.Video.Title.Description.Description,
    minLength: PostProperty.Video.Title.Validate.MinLength.Value,
    maxLength: PostProperty.Video.Title.Validate.MaxLength.Value,
  })
  @IsString()
  @IsOptional()
  @MinLength(PostProperty.Video.Title.Validate.MinLength.Value, {
    message: PostProperty.Video.Title.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Video.Title.Validate.MaxLength.Value, {
    message: PostProperty.Video.Title.Validate.MaxLength.Message,
  })
  public videoTitle: string | null;

  @ApiProperty({
    type: String,
    description: PostProperty.Video.Url.Description.Description,
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  @Matches(PostProperty.Video.Url.Validate.RegExp.Value, {
    message: PostProperty.Video.Url.Validate.RegExp.Message,
  })
  public videoUrl: string | null;
}
