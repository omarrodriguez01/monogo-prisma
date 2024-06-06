// test/setup.ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PrismaClient } from '@prisma/client';

let mongod: MongoMemoryServer;
let prisma: PrismaClient;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.DATABASE_URL = `${uri}test`;
  console.log('heloooooooooooooooooo', process.env.DATABASE_URL)


  // Instantiate Prisma client after setting the DATABASE_URL
  prisma = new PrismaClient();
  await prisma.$connect();
});

afterAll(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
  if (mongod) {
    await mongod.stop();
  }
});

// Export prisma for use in tests
export { prisma };
