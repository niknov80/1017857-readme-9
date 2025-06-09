import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class FollowersRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.Followers.Description.Description,
    example: SubscriptionProperty.Followers.Description.Example,
  })
  public userIds: string[];
}
