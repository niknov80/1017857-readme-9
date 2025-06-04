import { Injectable } from '@nestjs/common';
import { EntityFactory, UserSubscription } from '@project/core';
import { UserSubscriptionEntity } from './user-subscription.entity';

@Injectable()
export class UserSubscriptionFactory implements EntityFactory<UserSubscriptionEntity> {
  public create(entityPlainData: UserSubscription): UserSubscriptionEntity {
    return new UserSubscriptionEntity(entityPlainData);
  }
}
