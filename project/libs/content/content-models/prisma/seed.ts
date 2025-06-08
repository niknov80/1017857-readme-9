import { PrismaClient, PostStatus, PostType } from '.prisma/content-client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const FIRST_USER_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_USER_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

function getPosts() {
  return [
    // Первый пользователь: 3 поста
    {
      id: '11111111-aaaa-bbbb-cccc-111111111111',
      type: PostType.video,
      status: PostStatus.published,
      publicationDate: new Date(),
      createdAt: new Date(),
      tags: ['video', 'fun'],
      userId: FIRST_USER_UUID,
      isRepost: false,
      videoTitle: 'Sample Video Post',
      videoUrl: 'https://example.com/video.mp4',
    },
    {
      id: '22222222-aaaa-bbbb-cccc-222222222222',
      type: PostType.quote,
      status: PostStatus.published,
      publicationDate: new Date(),
      createdAt: new Date(),
      tags: ['quote', 'motivation'],
      userId: FIRST_USER_UUID,
      isRepost: false,
      quoteText: 'The best way to predict the future is to invent it.',
      quoteAuthor: 'Alan Kay',
    },
    {
      id: '33333333-aaaa-bbbb-cccc-333333333333',
      type: PostType.text,
      status: PostStatus.published,
      publicationDate: new Date(),
      createdAt: new Date(),
      tags: ['text', 'story'],
      userId: FIRST_USER_UUID,
      isRepost: false,
      textTitle: 'My Text Post',
      textAnnouncement: 'Short intro',
      textDescription: 'This is the full text of the post.',
    },

    // Второй пользователь: 2 поста
    {
      id: '44444444-aaaa-bbbb-cccc-444444444444',
      type: PostType.photo,
      status: PostStatus.published,
      publicationDate: new Date(),
      createdAt: new Date(),
      tags: ['photo', 'travel'],
      userId: SECOND_USER_UUID,
      isRepost: false,
      photoId: 'photo-uuid-123',
    },
    {
      id: '55555555-aaaa-bbbb-cccc-555555555555',
      type: PostType.link,
      status: PostStatus.published,
      publicationDate: new Date(),
      createdAt: new Date(),
      tags: ['link', 'useful'],
      userId: SECOND_USER_UUID,
      isRepost: false,
      linkUrl: 'https://example.com',
      linkDescription: 'Useful website',
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {
        ...post,
      },
      create: {
        ...post,
      },
    });
  }

  console.info('🤘️ Posts table was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
