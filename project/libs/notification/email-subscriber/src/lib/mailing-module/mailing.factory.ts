import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { randomUUID } from 'crypto';
import { Mailing, MailingEntity } from './mailing.entity';

@Injectable()
export class MailingFactory implements EntityFactory<MailingEntity> {
  /**
   * Создание из plain-данных (например, после fetch из БД)
   */
  public create(entityPlainData: Mailing): MailingEntity {
    return new MailingEntity({
      id: entityPlainData.id,
      userId: entityPlainData.userId,
      lastSentAt: new Date(entityPlainData.lastSentAt),
    });
  }

  /**
   * Создание новой записи рассылки
   */
  public createNew(userId: string): MailingEntity {
    return new MailingEntity({
      id: randomUUID(),
      userId,
      lastSentAt: new Date(),
    });
  }

  /**
   * Обновление даты последней рассылки
   */
  public updateLastSentAt(entity: MailingEntity, date: Date): MailingEntity {
    return new MailingEntity({
      id: entity.id,
      userId: entity.userId,
      lastSentAt: date,
    });
  }
}
