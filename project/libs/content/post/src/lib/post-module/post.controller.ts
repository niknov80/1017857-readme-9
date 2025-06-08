import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post as HttpPost, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { CreatePostDto } from '../dto/create-post-dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post-dto/update-post.dto';
import { resolvePostRdo } from '../rdo/resolve-post.rdo';
import { PostResponse } from './post.response';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  @ApiResponse(PostResponse.Created)
  @ApiResponse(PostResponse.BadRequest)
  public async create(@Body() dto: CreatePostDto) {
    const userId = 'mock-user-id';
    const post = await this.postService.create(dto, userId);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }

  @Put(':id')
  @ApiResponse(PostResponse.Updated)
  @ApiResponse(PostResponse.NotFound)
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDto) {
    const userId = 'mock-user-id';
    const post = await this.postService.update(id, dto, userId);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }

  @Delete(':id')
  @ApiResponse(PostResponse.Deleted)
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    const userId = 'mock-user-id';
    await this.postService.delete(id, userId);
  }

  @Get('feed')
  @ApiResponse(PostResponse.Listed)
  public async getFeed(
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('sortBy') sortBy: 'date' | 'likes' | 'comments' = 'date',
  ) {
    const posts = await this.postService.getFeed(Number(page), Number(limit), sortBy);
    return posts.map((post) => {
      const rdoClass = resolvePostRdo(post);
      return fillDto(rdoClass, post.toPOJO());
    });
  }

  @Get('user/:userId')
  @ApiResponse(PostResponse.Listed)
  public async getByUser(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('sortBy') sortBy: 'date' | 'likes' | 'comments' = 'date',
  ) {
    const posts = await this.postService.getByUser(userId, Number(page), Number(limit), sortBy);
    return posts.map((post) => {
      const rdoClass = resolvePostRdo(post);
      return fillDto(rdoClass, post.toPOJO());
    });
  }

  @Get('user/:userId/drafts')
  @ApiResponse(PostResponse.Listed)
  public async getDrafts(@Param('userId') userId: string) {
    const posts = await this.postService.getDrafts(userId);
    return posts.map((post) => {
      const rdoClass = resolvePostRdo(post);
      return fillDto(rdoClass, post.toPOJO());
    });
  }

  @Get('tag/:tag')
  @ApiResponse(PostResponse.Listed)
  public async getByTag(@Param('tag') tag: string, @Query('page') page = 1, @Query('limit') limit = 25) {
    const posts = await this.postService.getByTag(tag, Number(page), Number(limit));
    return posts.map((post) => {
      const rdoClass = resolvePostRdo(post);
      return fillDto(rdoClass, post.toPOJO());
    });
  }

  @Get('type/:type')
  @ApiResponse(PostResponse.Listed)
  public async getByType(@Param('type') type: string, @Query('page') page = 1, @Query('limit') limit = 25) {
    const posts = await this.postService.getByType(type, Number(page), Number(limit));
    return posts.map((post) => {
      const rdoClass = resolvePostRdo(post);
      return fillDto(rdoClass, post.toPOJO());
    });
  }

  @Get(':id')
  @ApiResponse(PostResponse.Found)
  @ApiResponse(PostResponse.NotFound)
  public async getById(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.getById(id);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }
}
