import { PostSortBy } from '@project/core';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class PostQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(PostSortBy)
  sortBy: PostSortBy = PostSortBy.Date;
}
