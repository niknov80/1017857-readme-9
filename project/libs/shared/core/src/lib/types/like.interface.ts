export interface Like {
  id: string; // ID лайка
  postId: string; // ID поста
  userId: string; // ID пользователя
  createdAt: Date; // Дата создания лайка
}
