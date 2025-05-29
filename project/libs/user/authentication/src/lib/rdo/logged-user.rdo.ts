import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class LoggedUserRdo {
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
    description: AuthenticationProperty.AccessToken.Description.Description,
    example: AuthenticationProperty.AccessToken.Description.Example,
  })
  public accessToken: string;
}
