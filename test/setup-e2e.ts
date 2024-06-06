// test/setup-e2e.ts
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config({ path: '.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Export prisma for use in tests
export { prisma };
