import { Entity, StorableEntity, SubscriptionStatus, UserSubscription } from '@project/core';

export class UserSubscriptionEntity extends Entity implements StorableEntity<UserSubscription> {
  public followerUserId: string;
  public followedUserId: string;
  public createdAt: Date;
  public status: SubscriptionStatus;

  constructor(data?: UserSubscription) {
    super();
    this.populate(data);
  }

  public populate(data?: UserSubscription): void {
    if (!data) {
      return;
    }

    this.id = data.id;
    this.followerUserId = data.followerUserId;
    this.followedUserId = data.followedUserId;
    this.createdAt = data.createdAt;
    this.status = data.status;
  }

  public toPOJO(): UserSubscription {
    return {
      id: this.id,
      followerUserId: this.followerUserId,
      followedUserId: this.followedUserId,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
