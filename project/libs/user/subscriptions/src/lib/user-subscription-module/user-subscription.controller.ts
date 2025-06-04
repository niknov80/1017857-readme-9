import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { plainToInstance } from 'class-transformer';
import { FollowDto } from '../dto/follow.dto';
import { IsSubscribedDto } from '../dto/is-subscribed.dto';
import { ActionSuccessRdo } from '../rdo/action-success.rdo';
import { FollowerProfileRdo } from '../rdo/follower-profile-rdo';
import { FollowersRdo } from '../rdo/followers.rdo';
import { FollowingsRdo } from '../rdo/followings.rdo';
import { IsSubscribedRdo } from '../rdo/is-subscribed.rdo';
import { UserSubscriptionResponse } from './user-subscription.response';
import { UserSubscriptionService } from './user-subscription.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) {}

  @Post('follow')
  @ApiOperation({ summary: 'Подписаться на пользователя' })
  @ApiResponse({ ...UserSubscriptionResponse.Subscribed })
  @ApiResponse({ ...UserSubscriptionResponse.BadRequest })
  @ApiResponse({ ...UserSubscriptionResponse.Unauthorized })
  @ApiResponse({ ...UserSubscriptionResponse.Conflict })
  public async follow(@Body() dto: FollowDto): Promise<ActionSuccessRdo> {
    await this.userSubscriptionService.subscribe(dto.followerUserId, dto.followedUserId);
    return fillDto(ActionSuccessRdo, { success: true });
  }

  @Post('unfollow')
  @ApiOperation({ summary: 'Отписаться от пользователя' })
  @ApiResponse({ ...UserSubscriptionResponse.Unsubscribed })
  @ApiResponse({ ...UserSubscriptionResponse.BadRequest })
  @ApiResponse({ ...UserSubscriptionResponse.Unauthorized })
  @ApiResponse({ ...UserSubscriptionResponse.NotFound })
  public async unfollow(@Body() dto: FollowDto): Promise<ActionSuccessRdo> {
    await this.userSubscriptionService.unsubscribe(dto.followerUserId, dto.followedUserId);
    return fillDto(ActionSuccessRdo, { success: true });
  }

  @Get('is-subscribed')
  @ApiOperation({ summary: 'Проверить активную подписку между пользователями' })
  @ApiResponse({ ...UserSubscriptionResponse.IsSubscribed })
  @ApiResponse({ ...UserSubscriptionResponse.BadRequest })
  @ApiResponse({ ...UserSubscriptionResponse.Unauthorized })
  public async isSubscribed(@Query() dto: IsSubscribedDto): Promise<IsSubscribedRdo> {
    const isSubscribed = await this.userSubscriptionService.isSubscribed(dto.followerUserId, dto.followedUserId);
    return fillDto(IsSubscribedRdo, { isSubscribed });
  }

  @Get('followers/:userId')
  @ApiOperation({ summary: 'Получить список подписчиков пользователя' })
  @ApiResponse({ ...UserSubscriptionResponse.FollowersFound })
  @ApiResponse({ ...UserSubscriptionResponse.BadRequest })
  @ApiResponse({ ...UserSubscriptionResponse.Unauthorized })
  @ApiResponse({ ...UserSubscriptionResponse.NotFound })
  public async getFollowers(@Param('userId') userId: string): Promise<FollowersRdo> {
    const userIds = await this.userSubscriptionService.getFollowers(userId);
    return fillDto(FollowersRdo, { userIds });
  }

  @Get('followings/:userId')
  @ApiOperation({ summary: 'Получить список пользователей, на которых подписан' })
  @ApiResponse({ ...UserSubscriptionResponse.FollowingsFound })
  @ApiResponse({ ...UserSubscriptionResponse.BadRequest })
  @ApiResponse({ ...UserSubscriptionResponse.Unauthorized })
  @ApiResponse({ ...UserSubscriptionResponse.NotFound })
  public async getFollowings(@Param('userId') userId: string): Promise<FollowingsRdo> {
    const userIds = await this.userSubscriptionService.getFollowings(userId);
    return fillDto(FollowingsRdo, { userIds });
  }

  @Get('followers-with-profile/:userId')
  @ApiOperation({ summary: 'Получить список подписчиков с профилем для страницы "Подписчики"' })
  @ApiResponse({ ...UserSubscriptionResponse.FollowersWithProfileFound })
  @ApiResponse({ ...UserSubscriptionResponse.BadRequest })
  @ApiResponse({ ...UserSubscriptionResponse.Unauthorized })
  @ApiResponse({ ...UserSubscriptionResponse.NotFound })
  public async getFollowersWithProfile(
    @Param('userId') userId: string,
    @Query('currentUserId') currentUserId: string,
  ): Promise<FollowerProfileRdo[]> {
    const result = await this.userSubscriptionService.getFollowersWithProfile(userId, currentUserId);
    return plainToInstance(FollowerProfileRdo, result, { excludeExtraneousValues: true });
  }
}
