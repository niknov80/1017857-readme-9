import { Entity, StorableEntity } from '@project/core';

export interface Mailing {
  id: string;
  userId: string;
  lastSentAt: Date;
}

export class MailingEntity extends Entity implements StorableEntity<Mailing> {
  public userId: string;
  public lastSentAt: Date;

  constructor(status?: Mailing) {
    super();
    this.populate(status);
  }

  public populate(status?: Mailing): void {
    if (!status) {
      return;
    }

    this.id = status.id ?? '';
    this.userId = status.userId;
    this.lastSentAt = new Date(status.lastSentAt);
  }

  public toPOJO(): Mailing {
    return {
      id: this.id,
      userId: this.userId,
      lastSentAt: this.lastSentAt,
    };
  }
}
