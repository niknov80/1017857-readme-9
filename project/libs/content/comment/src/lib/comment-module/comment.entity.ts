import { Comment, Entity, StorableEntity } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public postId: string;
  public authorId: string;
  public text: string;
  public createdAt: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) return;

    this.id = comment.id ?? '';
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      authorId: this.authorId,
      text: this.text,
      createdAt: this.createdAt,
    };
  }
}
