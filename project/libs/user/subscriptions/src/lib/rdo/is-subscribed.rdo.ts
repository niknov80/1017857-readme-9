import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class IsSubscribedRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.IsSubscribed.Description.Description,
    example: SubscriptionProperty.IsSubscribed.Description.Example,
  })
  public isSubscribed: boolean;
}
