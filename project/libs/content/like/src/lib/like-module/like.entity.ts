import { Like } from '@project/core';

export class LikeEntity implements Like {
  constructor(private readonly like: Like) {}

  get id() {
    return this.like.id;
  }

  get postId() {
    return this.like.postId;
  }

  get userId() {
    return this.like.userId;
  }

  get createdAt() {
    return this.like.createdAt;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }
}
