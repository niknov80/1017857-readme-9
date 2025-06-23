import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { EMAIL_NOT_VALID, NICKNAME_IS_EMPTY } from '../email-subscriber-module/email-subscriber.constant';

export class UpdateSubscriberDto {
  @IsOptional()
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email?: string;

  @IsOptional()
  @IsNotEmpty({ message: NICKNAME_IS_EMPTY })
  public nickname?: string;
}
