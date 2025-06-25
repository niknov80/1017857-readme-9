import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@project/core';
import { NotificationConfig } from '@project/notification-config';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';

interface PublicationDigestContext {
  user: string;
  publications: { title: string; link: string }[];
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotificationConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotificationConfig>;

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.nickname}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendPublicationDigest(email: string, nickname: string, publications: { title: string; link: string }[]) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: email,
      subject: 'Новые публикации от подписок',
      template: './digest',
      context: {
        user: nickname,
        publications,
      } satisfies PublicationDigestContext,
    });
  }
}
