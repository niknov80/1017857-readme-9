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
    description: AuthenticationProperty.FirstName.Description.Description,
    example: AuthenticationProperty.FirstName.Description.Example,
    minLength: AuthenticationProperty.FirstName.Validate.MinLength,
    maxLength: AuthenticationProperty.FirstName.Validate.MaxLength,
  })
  @IsString()
  @MinLength(AuthenticationProperty.FirstName.Validate.MinLength)
  @MaxLength(AuthenticationProperty.FirstName.Validate.MaxLength)
  public firstName: string;

  @ApiProperty({
    required: true,
    type: String,
    description: AuthenticationProperty.LastName.Description.Description,
    example: AuthenticationProperty.LastName.Description.Example,
    minLength: AuthenticationProperty.LastName.Validate.MinLength,
    maxLength: AuthenticationProperty.LastName.Validate.MaxLength,
  })
  @IsString()
  @MinLength(AuthenticationProperty.FirstName.Validate.MinLength)
  @MaxLength(AuthenticationProperty.FirstName.Validate.MaxLength)
  public lastName: string;

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
