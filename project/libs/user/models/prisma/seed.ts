import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const FIRST_USER_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_USER_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

function getUsers() {
  return [
    {
      id: FIRST_USER_UUID,
      email: 'ivans0797@gmail.com',
      login: 'Иван Семёнов',
      avatar: '/images/avatars/123.jpg',
      createdAt: new Date(2025, 2, 4),
      publicationsCount: 45,
      subscribersCount: 6,
      passwordHash: '$2a$10$kQs9Bt.dSokejCOPDb77E.a.AAqSXDbpfalXEsBATrIJm12N0lC/6',
    },
    {
      id: SECOND_USER_UUID,
      email: 'keks@mail.ru',
      login: 'Рыжий Кекс',
      avatar: '/images/avatars/321.jpg',
      createdAt: new Date(2025, 1, 23),
      publicationsCount: 78,
      subscribersCount: 21,
      passwordHash: '$2a$10$To.ARWKp9Iawy/BTQa68W.3sH88DL1X7xY2JXFpncC8LXvcPHpeEe',
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockUsers = getUsers();
  for (const user of mockUsers) {
    await prismaClient.blogUser.upsert({
      where: { id: user.id },
      update: {},
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
