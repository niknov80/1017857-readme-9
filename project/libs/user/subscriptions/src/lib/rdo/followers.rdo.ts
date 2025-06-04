import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class FollowersRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.UserIds,
    example: ['user-id-1', 'user-id-2', 'user-id-3'],
  })
  public userIds: string[];
}
