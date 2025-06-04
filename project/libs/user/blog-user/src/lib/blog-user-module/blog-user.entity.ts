import { AuthUser, Entity, StorableEntity } from '@project/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public login: string;
  public avatar?: string;
  public createdAt: Date;
  public publicationsCount: number;
  public subscribersCount: number;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.login = user.login;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      avatar: this.avatar,
      createdAt: this.createdAt,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
