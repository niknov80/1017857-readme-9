import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: AuthenticationProperty.Email.Description.Description,
    example: AuthenticationProperty.Email.Description.Example,
  })
  @IsString()
  @IsEmail({}, { message: AuthenticationProperty.Email.Validate.Message })
  public email: string;

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
  public password: string;
}
