import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

export class ActionSuccessRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.Success,
    example: true,
  })
  public success: boolean;
}
