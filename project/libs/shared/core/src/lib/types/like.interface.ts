export interface Like {
  id?: string; // Идентификатор записи лайка
  postId: string; // Идентификатор поста
  userId: string; // Идентификатор пользователя, который поставил лайк
  createdAt: Date; // Дата создания записи лайка
}
