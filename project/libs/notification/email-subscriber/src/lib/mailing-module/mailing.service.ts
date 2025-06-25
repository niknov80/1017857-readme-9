import { Injectable, Logger } from '@nestjs/common';
import { Post } from '@project/core';
import { randomUUID } from 'crypto';
import { MailService } from '../mail-module/mail.service';
import { MailingFactory } from './mailing.factory';
import { MailingRepository } from './mailing.repository';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);

  constructor(
    private readonly mailService: MailService,
    private readonly repository: MailingRepository,
    private readonly factory: MailingFactory,
  ) {}

  public async sendNewPostsDigest(userId: string, email: string, nickname: string, posts: Post[]): Promise<void> {
    this.logger.log(`Start digest mailing for userId: ${userId}`);

    const existing = await this.repository.findByUserId(userId);
    const now = new Date();

    const lastSentAt = existing?.lastSentAt ?? new Date(0);
    this.logger.log(`Last sent at: ${lastSentAt.toISOString()}`);
    this.logger.log(`Received posts: ${JSON.stringify(posts, null, 2)}`);

    const recentPosts = posts.filter((post) => new Date(post.publicationDate) > lastSentAt);

    if (recentPosts.length === 0) {
      this.logger.log(`No new posts for userId: ${userId}. Skipping email.`);
    } else {
      const publications = this.normalizePublications(recentPosts);
      await this.mailService.sendPublicationDigest(email, nickname, publications);
      this.logger.log(`Digest email sent to ${email}`);
    }

    const entity = existing
      ? this.factory.updateLastSentAt(existing, now)
      : this.factory.create({ id: randomUUID(), userId, lastSentAt: now });

    if (existing) {
      await this.repository.update(entity);
    } else {
      await this.repository.save(entity);
    }
  }

  private normalizePublications(posts: Post[]): { title: string; link: string }[] {
    return posts.map((post) => {
      const title = post.videoTitle || post.textTitle || post.quoteText || post.linkDescription || 'Без названия';

      return {
        title,
        link: `http://localhost:3001/post/${post.id}`,
      };
    });
  }
}
