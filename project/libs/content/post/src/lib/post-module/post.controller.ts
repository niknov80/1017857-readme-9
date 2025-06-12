import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post as HttpPost,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@project/authentication';
import { PostType, RequestWithUser } from '@project/core';
import { fillDto } from '@project/helpers';
import { CreatePostDto } from '../dto/create-post-dto/create-post.dto';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { PostQueryDto } from '../dto/post-query.dto';
import { UpdatePostDto } from '../dto/update-post-dto/update-post.dto';
import { resolvePostRdo } from '../rdo/resolve-post.rdo';
import { PostResponse } from './post.response';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  @UseGuards(JwtAuthGuard)
  @ApiResponse(PostResponse.Created)
  @ApiResponse(PostResponse.BadRequest)
  public async create(@Body() dto: CreatePostDto, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const post = await this.postService.create(dto, userId);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(PostResponse.Updated)
  @ApiResponse(PostResponse.NotFound)
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDto, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const post = await this.postService.update(id, dto, userId);
    const rdoClass = resolvePostRdo(post);
    return fillDto(rdoClass, post.toPOJO());
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(PostResponse.Deleted)
  public async delete(@Param('id', ParseUUIDPipe) id: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;
    await this.postService.delete(id, userId);
  }

  @Get('feed')
  @ApiResponse(PostResponse.Listed)
  public async getFeed(@Query() query: PostQueryDto) {
    const posts = await this.postService.getFeed(query.page, query.limit, query.sortBy);
    return {
      items: posts.items.map((post) => {
        const rdoClass = resolvePostRdo(post);
        return fillDto(rdoClass, post.toPOJO());
      }),
      page: posts.page,
      limit: posts.limit,
      totalCount: posts.totalCount,
      totalPages: posts.totalPages,
    };
  }

  @Get('user/:userId')
  @ApiResponse(PostResponse.Listed)
  public async getByUser(@Param('userId', ParseUUIDPipe) userId: string, @Query() query: PostQueryDto) {
    const posts = await this.postService.getByUser(userId, query.page, query.limit, query.sortBy);
    return {
      items: posts.items.map((post) => {
        const rdoClass = resolvePostRdo(post);
        return fillDto(rdoClass, post.toPOJO());
      }),
      page: posts.page,
      limit: posts.limit,
      totalCount: posts.totalCount,
      totalPages: posts.totalPages,
    };
  }

  @Get('user/drafts')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(PostResponse.Listed)
  public async getDrafts(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const posts = await this.postService.getDrafts(userId);
    return posts.map((post) => {
      const rdoClass = resolvePostRdo(post);
      return fillDto(rdoClass, post.toPOJO());
    });
  }

  @Get('tag/:tag')
  @ApiResponse(PostResponse.Listed)
  public async getByTag(@Param('tag') tag: string, @Query() query: PaginationQueryDto) {
    const posts = await this.postService.getByTag(tag, query.page, query.limit);
    return {
      items: posts.items.map((post) => {
        const rdoClass = resolvePostRdo(post);
        return fillDto(rdoClass, post.toPOJO());
      }),
      page: posts.page,
      limit: posts.limit,
      totalCount: posts.totalCount,
      totalPages: posts.totalPages,
    };
  }

  @Get('type/:type')
  @ApiResponse(PostResponse.Listed)
  public async getByType(
    @Param('type', new ParseEnumPipe(PostType)) type: PostType,
    @Query() query: PaginationQueryDto,
  ) {
    const posts = await this.postService.getByType(type, query.page, query.limit);
    return {
      items: posts.items.map((post) => {
        const rdoClass = resolvePostRdo(post);
        return fillDto(rdoClass, post.toPOJO());
      }),
      page: posts.page,
      limit: posts.limit,
      totalCount: posts.totalCount,
      totalPages: posts.totalPages,
    };
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
