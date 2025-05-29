import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class changePasswordDto {
  @ApiProperty({
    type: String,
    description: AuthenticationProperty.UserId.Description.Description,
    example: AuthenticationProperty.UserId.Description.Example,
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    type: String,
    description: AuthenticationProperty.OldPassword.Description.Description,
    example: AuthenticationProperty.OldPassword.Description.Example,
  })
  @IsString()
  public oldPassword: string;

  @ApiProperty({
    required: true,
    type: String,
    description: AuthenticationProperty.Password.Description.Description,
    example: AuthenticationProperty.Password.Description.Example,
    minLength: AuthenticationProperty.Password.Validate.MinLength.Value,
    maxLength: AuthenticationProperty.Password.Validate.MaxLength.Value,
  })
  @IsString()
  @MinLength(AuthenticationProperty.Password.Validate.MinLength.Value, {
    message: AuthenticationProperty.Password.Validate.MinLength.Message,
  })
  @MaxLength(AuthenticationProperty.Password.Validate.MaxLength.Value, {
    message: AuthenticationProperty.Password.Validate.MaxLength.Message,
  })
  @Matches(AuthenticationProperty.Password.Validate.RegExp.Value, {
    message: AuthenticationProperty.Password.Validate.RegExp.Message,
  })
  public newPassword: string;
}
