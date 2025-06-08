export interface Comment {
  id: string; // Идентификатор комментария.
  createdAt: Date; // Дата создания комментария.
  authorId: string; // Идентификатор пользователя, который написал комментарий (authorId в Prisma).
  postId: string; // Идентификатор публикации.
  text: string; // Текст комментария (мин. 10 символов, макс. 300).
}
