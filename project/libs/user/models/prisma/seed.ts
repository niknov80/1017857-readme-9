import { PrismaClient, SubscriptionStatus } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const FIRST_USER_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_USER_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const THIRD_USER_UUID = 'b3e2c8d6-9f6a-4b14-b1f2-4c77bff84b75';

function getUsers() {
  return [
    {
      id: FIRST_USER_UUID,
      email: 'first.user@example.com',
      login: 'Первый Пользователь',
      avatar: '/images/avatars/first.jpg',
      createdAt: new Date(2025, 2, 4),
      publicationsCount: 10,
      subscribersCount: 2,
      passwordHash: '$2a$10$kQs9Bt.dSokejCOPDb77E.a.AAqSXDbpfalXEsBATrIJm12N0lC/6',
    },
    {
      id: SECOND_USER_UUID,
      email: 'second.user@example.com',
      login: 'Второй Пользователь',
      avatar: '/images/avatars/second.jpg',
      createdAt: new Date(2025, 1, 15),
      publicationsCount: 5,
      subscribersCount: 1,
      passwordHash: '$2a$10$To.ARWKp9Iawy/BTQa68W.3sH88DL1X7xY2JXFpncC8LXvcPHpeEe',
    },
    {
      id: THIRD_USER_UUID,
      email: 'third.user@example.com',
      login: 'Третий Пользователь',
      avatar: '/images/avatars/third.jpg',
      createdAt: new Date(2025, 3, 12),
      publicationsCount: 0,
      subscribersCount: 0,
      passwordHash: '$2a$10$To.ARWKp9Iawy/BTQa68W.3sH88DL1X7xY2JXFpncC8LXvcPHpeEe',
    },
  ];
}

function getSubscriptions() {
  return [
    {
      followerUserId: SECOND_USER_UUID,
      followedUserId: FIRST_USER_UUID,
      status: SubscriptionStatus.ACTIVE,
    },
    {
      followerUserId: THIRD_USER_UUID,
      followedUserId: FIRST_USER_UUID,
      status: SubscriptionStatus.ACTIVE,
    },
    {
      followerUserId: FIRST_USER_UUID,
      followedUserId: SECOND_USER_UUID,
      status: SubscriptionStatus.ACTIVE,
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockUsers = getUsers();
  const mockSubscriptions = getSubscriptions();

  // Сначала пользователи
  for (const user of mockUsers) {
    await prismaClient.blogUser.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        login: user.login,
        avatar: user.avatar,
        createdAt: user.createdAt,
        publicationsCount: user.publicationsCount,
        subscribersCount: user.subscribersCount,
        passwordHash: user.passwordHash,
      },
      create: {
        id: user.id,
        email: user.email,
        login: user.login,
        avatar: user.avatar,
        createdAt: user.createdAt,
        publicationsCount: user.publicationsCount,
        subscribersCount: user.subscribersCount,
        passwordHash: user.passwordHash,
      },
    });
  }

  // Затем подписки
  for (const subscription of mockSubscriptions) {
    await prismaClient.userSubscription.upsert({
      where: {
        followerUserId_followedUserId: {
          followerUserId: subscription.followerUserId,
          followedUserId: subscription.followedUserId,
        },
      },
      update: {
        status: subscription.status,
      },
      create: {
        followerUserId: subscription.followerUserId,
        followedUserId: subscription.followedUserId,
        status: subscription.status,
      },
    });
  }

  console.info('🤘️ Database was filled');
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
