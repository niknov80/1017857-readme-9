import { SubscriptionStatus } from '@project/core';

export interface UserSubscription {
  id: string;
  followerUserId: string;
  followedUserId: string;
  createdAt: Date;
  status: SubscriptionStatus;
}
