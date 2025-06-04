import { HttpStatus } from '@nestjs/common';
import { ActionSuccessRdo } from '../rdo/action-success.rdo';
import { FollowerProfileRdo } from '../rdo/follower-profile-rdo';
import { FollowersRdo } from '../rdo/followers.rdo';
import { FollowingsRdo } from '../rdo/followings.rdo';
import { IsSubscribedRdo } from '../rdo/is-subscribed.rdo';

export const UserSubscriptionResponse = {
  Subscribed: {
    type: ActionSuccessRdo,
    status: HttpStatus.OK,
    description: 'User successfully subscribed',
  },
  Unsubscribed: {
    type: ActionSuccessRdo,
    status: HttpStatus.OK,
    description: 'User successfully unsubscribed',
  },
  IsSubscribed: {
    type: IsSubscribedRdo,
    status: HttpStatus.OK,
    description: 'Subscription status retrieved',
  },
  FollowersFound: {
    type: FollowersRdo,
    status: HttpStatus.OK,
    description: 'List of followers retrieved',
  },
  FollowingsFound: {
    type: FollowingsRdo,
    status: HttpStatus.OK,
    description: 'List of followings retrieved',
  },
  FollowersWithProfileFound: {
    type: FollowerProfileRdo,
    status: HttpStatus.OK,
    isArray: true,
    description: 'Список подписчиков с профилем успешно получен',
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  },
  Conflict: {
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
  },
} as const;
