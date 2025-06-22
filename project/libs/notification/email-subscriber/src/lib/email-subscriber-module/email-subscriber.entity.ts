import { Entity, StorableEntity, Subscriber } from '@project/core';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email: string;
  public nickname: string;

  constructor(subscriber?: Subscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: Subscriber): void {
    if (!subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.nickname = subscriber.nickname;
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
    };
  }
}
