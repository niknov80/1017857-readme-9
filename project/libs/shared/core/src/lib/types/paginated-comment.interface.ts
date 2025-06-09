import { CommentEntity } from '@project/comment';

export interface PaginatedComment {
  items: CommentEntity[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
