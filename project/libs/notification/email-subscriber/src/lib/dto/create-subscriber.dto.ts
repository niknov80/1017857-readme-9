import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_NOT_VALID, NICKNAME_IS_EMPTY } from '../email-subscriber-module/email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NICKNAME_IS_EMPTY })
  public nickname: string;
}
