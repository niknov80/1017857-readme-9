import { PostStatus, PostType } from '@project/core';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { EMAIL_NOT_VALID, NICKNAME_IS_EMPTY, USER_ID_IS_EMPTY } from '../mailing-module/mailnig.constant';

class PostDto {
  @IsString()
  id: string;

  @IsEnum(PostType)
  type: PostType;

  @IsEnum(PostStatus)
  status: PostStatus;

  @IsDateString()
  publicationDate: string;

  @IsDateString()
  createdAt: string;

  @IsString()
  videoTitle: string;

  @IsString()
  videoUrl: string;

  @IsString()
  textTitle: string;

  @IsString()
  textAnnouncement: string;

  @IsString()
  textDescription: string;

  @IsString()
  quoteText: string;

  @IsString()
  quoteAuthor: string;

  @IsString()
  photoId: string;

  @IsString()
  linkUrl: string;

  @IsOptional()
  @IsString()
  linkDescription: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsUUID()
  userId: string;

  @IsBoolean()
  isRepost: boolean;

  @IsOptional()
  @IsString()
  repostId: string;

  @IsOptional()
  @IsString()
  repostUserId: string;

  @IsNotEmpty()
  viewCount: number;

  @IsNotEmpty()
  likeCount: number;

  @IsNotEmpty()
  commentCount: number;

  @IsNotEmpty()
  repostCount: number;
}

export class DigestRequestDto {
  @IsUUID('4', { message: USER_ID_IS_EMPTY })
  public userId: string;

  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NICKNAME_IS_EMPTY })
  public nickname: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PostDto)
  public posts: PostDto[];
}
