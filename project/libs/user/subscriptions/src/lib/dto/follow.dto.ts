import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class FollowDto {
  @ApiProperty({
    required: true,
    type: String,
    description: SubscriptionProperty.Follower.Description.Description,
    example: SubscriptionProperty.Follower.Description.Example,
  })
  @IsUUID('4', { message: SubscriptionProperty.Follower.Validate.Message })
  public followerUserId: string;

  @ApiProperty({
    required: true,
    type: String,
    description: SubscriptionProperty.Followed.Description.Description,
    example: SubscriptionProperty.Followed.Description.Example,
  })
  @IsUUID('4', { message: SubscriptionProperty.Followed.Validate.Message })
  public followedUserId: string;
}
