import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'MongoMemoryServer',
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        process.env.DATABASE_URL = uri;
        return mongod;
      },
    },
    {
      provide: PrismaClient,
      useFactory: async () => {
        const prisma = new PrismaClient();
        await prisma.$connect();
        return prisma;
      },
    },
  ],
  exports: [PrismaService, PrismaClient],
})
export class PrismaTestModule {}
