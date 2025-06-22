import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaNotificationClientService } from '@project/notification-models';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';

@Injectable()
export class EmailSubscriberRepository extends BasePostgresRepository<
  EmailSubscriberEntity,
  ReturnType<EmailSubscriberEntity['toPOJO']>,
  PrismaNotificationClientService
> {
  constructor(factory: EmailSubscriberFactory, client: PrismaNotificationClientService) {
    super(factory, client);
  }

  /**
   * Сохраняет нового подписчика
   */
  public async save(entity: EmailSubscriberEntity): Promise<void> {
    await this.client.subscriber.create({
      data: entity.toPOJO(),
    });
  }

  /**
   * Находит подписчика по ID
   */
  public async findById(id: string): Promise<EmailSubscriberEntity> {
    const record = await this.client.subscriber.findUniqueOrThrow({
      where: { id },
    });

    return this.createEntityFromDocument(record);
  }

  /**
   * Обновляет подписчика
   */
  public async update(entity: EmailSubscriberEntity): Promise<void> {
    await this.client.subscriber.update({
      where: { id: entity.id },
      data: entity.toPOJO(),
    });
  }

  /**
   * Удаляет подписчика по ID
   */
  public async deleteById(id: string): Promise<void> {
    await this.client.subscriber.delete({
      where: { id },
    });
  }

  /**
   * Найти подписчика по email
   */
  public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
    const record = await this.client.subscriber.findUnique({
      where: { email },
    });

    return this.createEntityFromDocument(record);
  }
}
