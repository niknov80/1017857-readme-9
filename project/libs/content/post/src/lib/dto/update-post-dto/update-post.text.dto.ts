import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { UpdatePostBaseDto } from './update-post.base.dto';

export class UpdateTextPostDto extends UpdatePostBaseDto {
  @ApiProperty({
    type: String,
    description: PostProperty.Text.Title.Description.Description,
    minLength: PostProperty.Text.Title.Validate.MinLength.Value,
    maxLength: PostProperty.Text.Title.Validate.MaxLength.Value,
  })
  @IsString()
  @IsOptional()
  @MinLength(PostProperty.Text.Title.Validate.MinLength.Value, {
    message: PostProperty.Text.Title.Validate.MinLength.Message,
  })
  @MaxLength(PostProperty.Text.Title.Validate.MaxLength.Value, {
    message: PostProperty.Text.Title.Validate.MaxLength.Message,
  })
  public textTitle: string | null;

  @ApiProperty({
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
  @IsOptional()
  public textAnnouncement: string | null;

  @ApiProperty({
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
  @IsOptional()
  public textDescription: string | null;
}
