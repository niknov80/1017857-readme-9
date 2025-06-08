import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostType } from '@project/core';
import { CreatePostDto } from '../dto/create-post-dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post-dto/update-post.dto';
import { POST_FORBIDDEN, POST_NOT_FOUND } from './post.constant';
import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
  ) {}

  public async create(dto: CreatePostDto, userId: string): Promise<PostEntity> {
    const post = this.postFactory.createPostFromDto(dto, userId);
    await this.postRepository.save(post);
    return post;
  }

  public async update(id: string, dto: UpdatePostDto, userId: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    if (post.userId !== userId) {
      throw new ForbiddenException(POST_FORBIDDEN);
    }

    const updatedPost = this.postFactory.updatePostFromDto(post, dto);
    await this.postRepository.update(updatedPost);

    return updatedPost;
  }

  public async delete(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    if (post.userId !== userId) {
      throw new ForbiddenException(POST_FORBIDDEN);
    }

    await this.postRepository.deleteById(id);
  }

  public async getById(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async getFeed(page = 1, limit = 25, sortBy: 'date' | 'likes' | 'comments' = 'date'): Promise<PostEntity[]> {
    return this.postRepository.findAllPublished(page, limit, sortBy);
  }

  public async getByUser(
    userId: string,
    page = 1,
    limit = 25,
    sortBy: 'date' | 'likes' | 'comments' = 'date',
  ): Promise<PostEntity[]> {
    return this.postRepository.findPublishedByUserId(userId, page, limit, sortBy);
  }

  public async getDrafts(userId: string): Promise<PostEntity[]> {
    return this.postRepository.findDraftsByUserId(userId);
  }

  public async getByTag(tag: string, page = 1, limit = 25): Promise<PostEntity[]> {
    return this.postRepository.findByTag(tag, page, limit);
  }

  public async getByType(type: string, page = 1, limit = 25): Promise<PostEntity[]> {
    return this.postRepository.findByType(type as PostType, page, limit);
  }
}
