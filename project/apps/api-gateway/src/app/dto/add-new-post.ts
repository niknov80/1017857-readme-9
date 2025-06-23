import { PostType } from '@project/core';

export class AddNewPostDto {
  public title: string;
  public description: string;
  public content: string;
  public categories: PostType;
}
