import { Injectable } from '@nestjs/common';
import { EntityFactory, Subscriber } from '@project/core';
import { randomUUID } from 'crypto';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { UpdateSubscriberDto } from '../dto/update-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberFactory implements EntityFactory<EmailSubscriberEntity> {
  /**
   * Создание из plain-данных (например, после fetch из БД)
   */
  public create(entityPlainData: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity({
      id: entityPlainData.id,
      email: entityPlainData.email,
      nickname: entityPlainData.nickname,
    });
  }

  /**
   * Создание нового подписчика из DTO
   */
  public createFromDto(dto: CreateSubscriberDto): EmailSubscriberEntity {
    return new EmailSubscriberEntity({
      id: randomUUID(),
      email: dto.email,
      nickname: dto.nickname,
    });
  }

  /**
   * Обновление подписчика из DTO
   */
  public updateFromDto(entity: EmailSubscriberEntity, dto: UpdateSubscriberDto): EmailSubscriberEntity {
    return new EmailSubscriberEntity({
      id: entity.id,
      email: dto.email ?? entity.email,
      nickname: dto.nickname ?? entity.nickname,
    });
  }
}
