import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class FollowingsRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.Followings,
    example: ['user-id-10', 'user-id-11', 'user-id-12'],
  })
  public userIds: string[];
}
