import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { UpdateSubscriberDto } from '../dto/update-subscriber.dto';
import { SUBSCRIBER_NOT_FOUND } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly repository: EmailSubscriberRepository,
    private readonly factory: EmailSubscriberFactory,
  ) {}

  public async create(dto: CreateSubscriberDto): Promise<EmailSubscriberEntity> {
    const { email } = dto;
    const existing = await this.repository.findByEmail(email);

    if (existing) {
      return existing;
    }

    const entity = this.factory.createFromDto(dto);
    await this.repository.save(entity);

    return entity;
  }

  public async update(id: string, dto: UpdateSubscriberDto): Promise<EmailSubscriberEntity> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundException(SUBSCRIBER_NOT_FOUND);
    }

    const updated = this.factory.updateFromDto(existing, dto);
    await this.repository.update(updated);

    return updated;
  }

  public async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundException(SUBSCRIBER_NOT_FOUND);
    }

    await this.repository.deleteById(id);
  }

  public async getById(id: string): Promise<EmailSubscriberEntity> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundException(SUBSCRIBER_NOT_FOUND);
    }

    return existing;
  }

  public async getByEmail(email: string): Promise<EmailSubscriberEntity> {
    const existing = await this.repository.findByEmail(email);

    if (!existing) {
      throw new NotFoundException(SUBSCRIBER_NOT_FOUND);
    }

    return existing;
  }
}
