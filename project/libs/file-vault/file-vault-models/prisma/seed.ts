import { PrismaClient } from '.prisma/file-vault-client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

function getFiles() {
  return [
    {
      id: 'aaaa1111-bbbb-2222-cccc-3333dddd4444',
      originalName: 'test-image-1.jpg',
      size: 150000,
      mimetype: 'image/jpeg',
      hashName: `'fixedhash1.jpg`,
      path: '/uploads/test-image-1.jpg',
      subDirectory: 'avatars',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'eeee5555-ffff-6666-gggg-7777hhhh8888',
      originalName: 'test-image-2.png',
      size: 220000,
      mimetype: 'image/png',
      hashName: `'fixedhash2.jpg`,
      path: '/uploads/test-image-2.png',
      subDirectory: 'covers',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockFiles = getFiles();

  for (const file of mockFiles) {
    await prismaClient.file.upsert({
      where: { id: file.id },
      update: { ...file },
      create: { ...file },
    });
  }

  console.info('📂 Files table was filled');
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
