import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class UserRdo {
  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.UserId.Description.Description,
    example: AuthenticationProperty.UserId.Description.Example,
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.Email.Description.Description,
    example: AuthenticationProperty.Email.Description.Example,
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.Login.Description.Description,
    example: AuthenticationProperty.Login.Description.Example,
  })
  public login: string;

  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.Avatar.Description.Description,
    example: AuthenticationProperty.Avatar.Description.Example,
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.CreatedAt.Description.Description,
    example: AuthenticationProperty.CreatedAt.Description.Example,
  })
  public createAt: string;

  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.PublicationsCount.Description.Description,
    example: AuthenticationProperty.PublicationsCount.Description.Example,
  })
  public publicationsCount: string;

  @Expose()
  @ApiProperty({
    description: AuthenticationProperty.SubscribersCount.Description.Description,
    example: AuthenticationProperty.SubscribersCount.Description.Example,
  })
  public subscribersCount: string;
}
