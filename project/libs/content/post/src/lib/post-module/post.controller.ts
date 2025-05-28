import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { CreatePostDto } from '../dto/create-post-dto/create-post.dto';
import { resolvePostRdo } from '../rdo/resolve-post.rdo';
import { PostResponse } from './post.respose';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiResponse(PostResponse.Created)
  @ApiResponse(PostResponse.BadRequest)
  public async create(@Body() dto: CreatePostDto) {
    const userId = 'mock-user-id';
    const post = await this.postService.create(dto, userId);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }

  @Get(':id')
  @ApiResponse(PostResponse.Found)
  @ApiResponse(PostResponse.NotFound)
  public async getById(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.getById(id);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }

  @Delete(':id')
  @ApiResponse(PostResponse.Deleted)
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    const userId = 'mock-user-id';
    await this.postService.delete(id, userId);
  }
}
