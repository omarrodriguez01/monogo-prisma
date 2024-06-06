import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaTestModule } from '../prisma/prisma-test.module';
import { PrismaService } from '../prisma/prisma.service';
// import { Team } from '@prisma/client';

describe('TeamsService', () => {
  let service: TeamsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaTestModule],
      providers: [TeamsService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.team.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
