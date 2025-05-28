import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { CreatePostBaseDto } from './create-post.base.dto';

export class CreateTextPostDto extends CreatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Text.Title.Description.Description,
    minLength: PostProperty.Text.Title.Validate.MinLength.Value,
    maxLength: PostProperty.Text.Title.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(PostProperty.Text.Title.Validate.MinLength.Value, {
    message: PostProperty.Text.Title.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Text.Title.Validate.MaxLength.Value, {
    message: PostProperty.Text.Title.Validate.MaxLength.Message,
  })
  @IsNotEmpty()
  public textTitle: string;

  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Text.Announcement.Description.Description,
    minLength: PostProperty.Text.Announcement.Validate.MinLength.Value,
    maxLength: PostProperty.Text.Announcement.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(PostProperty.Text.Announcement.Validate.MinLength.Value, {
    message: PostProperty.Text.Announcement.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Text.Announcement.Validate.MaxLength.Value, {
    message: PostProperty.Text.Announcement.Validate.MaxLength.Message,
  })
  @IsNotEmpty()
  public textAnnouncement: string;

  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Text.Description.Description.Description,
    minLength: PostProperty.Text.Description.Validate.MinLength.Value,
    maxLength: PostProperty.Text.Description.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(PostProperty.Text.Description.Validate.MinLength.Value, {
    message: PostProperty.Text.Description.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Text.Description.Validate.MaxLength.Value, {
    message: PostProperty.Text.Description.Validate.MaxLength.Message,
  })
  @IsNotEmpty()
  public textDescription: string;
}
