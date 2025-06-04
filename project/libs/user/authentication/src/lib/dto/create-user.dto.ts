import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: AuthenticationProperty.Email.Description.Description,
    example: AuthenticationProperty.Email.Description.Example,
  })
  @IsEmail({}, { message: AuthenticationProperty.Email.Validate.Message })
  public email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: AuthenticationProperty.Login.Description.Description,
    example: AuthenticationProperty.Login.Description.Example,
    minLength: AuthenticationProperty.Login.Validate.MinLength,
    maxLength: AuthenticationProperty.Login.Validate.MaxLength,
  })
  @IsString()
  @MinLength(AuthenticationProperty.Login.Validate.MinLength)
  @MaxLength(AuthenticationProperty.Login.Validate.MaxLength)
  public login: string;

  @ApiPropertyOptional({
    type: String,
    description: AuthenticationProperty.Avatar.Description.Description,
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

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
