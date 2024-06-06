import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { prisma } from './setup-e2e';

describe('TeamsController (e2e)', () => {
  let app: INestApplication;
  let createdTeamId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await prisma.team.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/teams (POST)', async () => {
    const teamName = 'Team A';
    const response = await request(app.getHttpServer())
      .post('/teams')
      .send({ name: teamName })
      .expect(201);

    createdTeamId =response.body.id;

    expect(response.body.name).toBe(teamName);
  });

  it('/teams/:id (GET) - Find by ID from previous test', async () => {
    const response = await request(app.getHttpServer())
      .get(`/teams/${createdTeamId}`)
      .expect(200);

    expect(response.body.name).toBe('Team A');
  });

  it('/teams (GET)', async () => {
    await prisma.team.create({ data: { name: 'Team A' } });
    await prisma.team.create({ data: { name: 'Team B' } });

    const response = await request(app.getHttpServer())
      .get('/teams')
      .expect(200);

    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe('Team A');
    expect(response.body[1].name).toBe('Team A');
    expect(response.body[2].name).toBe('Team B');
  });
});
