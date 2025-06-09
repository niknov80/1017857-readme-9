import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class FollowingsRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.Followings.Description.Description,
    example: SubscriptionProperty.Followings.Description.Example,
  })
  public userIds: string[];
}
