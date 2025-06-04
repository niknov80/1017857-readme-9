import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class FollowDto {
  @ApiProperty({
    required: true,
    type: String,
    description: SubscriptionProperty.FollowerUserId,
    example: '11111111-1111-1111-1111-111111111111',
  })
  @IsString()
  public followerUserId: string;

  @ApiProperty({
    required: true,
    type: String,
    description: SubscriptionProperty.FollowerUserId,
    example: '22222222-2222-2222-2222-222222222222',
  })
  @IsString()
  public followedUserId: string;
}
