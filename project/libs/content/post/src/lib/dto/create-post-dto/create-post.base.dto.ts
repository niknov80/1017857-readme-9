import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@project/core';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';

export class CreatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Type.Description.Description,
  })
  @IsEnum(PostType)
  public type: PostType;

  @ApiProperty({ required: true, type: String, description: PostProperty.Status.Description.Description })
  @IsEnum(PostStatus)
  public status: PostStatus;

  @ApiProperty({ required: true, type: String, description: PostProperty.PublicationDate.Description.Description })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public publicationDate: Date;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(8)
  @Matches(PostProperty.Tags.Validate.RegExp.LetterStart.Value, {
    each: true,
    message: PostProperty.Tags.Validate.RegExp.LetterStart.Message,
  })
  @Matches(PostProperty.Tags.Validate.RegExp.NoSpace.Value, {
    each: true,
    message: PostProperty.Tags.Validate.RegExp.NoSpace.Message,
  })
  @MinLength(PostProperty.Tags.Validate.MinLength.Value, { each: true })
  @MaxLength(PostProperty.Tags.Validate.MaxLength.Value, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value.map((tag) => tag.toLowerCase()) : value))
  public tags: string[] | null;
}
