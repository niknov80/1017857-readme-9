import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SubscriptionProperty } from '../user-subscription-module/user-subscription.constant';

/**
 * Профиль подписчика для отображения на странице "Подписчики".
 */
export class FollowerProfileRdo {
  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.FollowerProfile.userId.Description,
    example: SubscriptionProperty.FollowerProfile.userId.Example,
  })
  public userId: string;

  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.FollowerProfile.login.Description,
    example: SubscriptionProperty.FollowerProfile.login.Example,
  })
  public login: string;

  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.FollowerProfile.publicationsCount.Description,
    example: SubscriptionProperty.FollowerProfile.publicationsCount.Example,
  })
  public publicationsCount: number;

  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.FollowerProfile.subscribersCount.Description,
    example: SubscriptionProperty.FollowerProfile.subscribersCount.Example,
  })
  public subscribersCount: number;

  @Expose()
  @ApiProperty({
    description: SubscriptionProperty.FollowerProfile.isSubscribed.Description,
    example: SubscriptionProperty.FollowerProfile.isSubscribed.Example,
  })
  public isSubscribed: boolean;
}
