import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * Профиль подписчика для отображения на странице "Подписчики".
 */
export class FollowerProfileRdo {
  @Expose()
  @ApiProperty({
    description: 'ID пользователя',
    example: '6d308040-96a2-4162-bea6-2338e9976540',
  })
  public userId: string;

  @Expose()
  @ApiProperty({
    description: 'Логин пользователя',
    example: 'Первый Пользователь',
  })
  public login: string;

  @Expose()
  @ApiProperty({
    description: 'Количество публикаций пользователя',
    example: 10,
  })
  public publicationsCount: number;

  @Expose()
  @ApiProperty({
    description: 'Количество подписчиков пользователя',
    example: 5,
  })
  public subscribersCount: number;

  @Expose()
  @ApiProperty({
    description: 'Признак, подписан ли текущий пользователь на этого пользователя',
    example: true,
  })
  public isSubscribed: boolean;
}
