import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaNotificationClientService } from '@project/notification-models';
import { MailingEntity } from './mailing.entity';
import { MailingFactory } from './mailing.factory';

@Injectable()
export class MailingRepository extends BasePostgresRepository<
  MailingEntity,
  ReturnType<MailingEntity['toPOJO']>,
  PrismaNotificationClientService
> {
  constructor(factory: MailingFactory, client: PrismaNotificationClientService) {
    super(factory, client);
  }

  /**
   * Сохраняет новую запись статуса рассылки
   */
  public async save(entity: MailingEntity): Promise<void> {
    await this.client.mailingStatus.create({
      data: entity.toPOJO(),
    });
  }

  /**
   * Находит статус по ID
   */
  public async findById(id: string): Promise<MailingEntity> {
    const record = await this.client.mailingStatus.findUniqueOrThrow({
      where: { id },
    });

    return this.createEntityFromDocument(record);
  }

  /**
   * Обновляет статус по ID
   */
  public async update(entity: MailingEntity): Promise<void> {
    await this.client.mailingStatus.update({
      where: { id: entity.id },
      data: entity.toPOJO(),
    });
  }

  /**
   * Удаляет статус по ID
   */
  public async deleteById(id: string): Promise<void> {
    await this.client.mailingStatus.delete({
      where: { id },
    });
  }

  /**
   * Находит статус по userId
   */
  public async findByUserId(userId: string): Promise<MailingEntity | null> {
    const record = await this.client.mailingStatus.findUnique({
      where: { userId },
    });

    return record ? this.createEntityFromDocument(record) : null;
  }
}
