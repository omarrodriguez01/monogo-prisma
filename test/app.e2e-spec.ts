import { Body, INestApplication } from '@nestjs/common';
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
    await prisma.team.deleteMany();
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

describe('StudentsController (e2e)', () => {
  let app: INestApplication;
  let createdTeamId: string;
  let createdStudentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await prisma.student.deleteMany();
  });

  afterAll(async () => {
    await prisma.student.deleteMany();
    await app.close();
  });

  it('/students (POST)', async () => {
    const teamResponse = await request(app.getHttpServer())
    .post('/teams')
    .send({ name: 'Team A' });

    createdTeamId =teamResponse.body.id;


    const studentData = {
      name: 'John Doe',
      generation: 2024,
      teamId: createdTeamId,
    };

    const studentResponse = await request(app.getHttpServer())
    .post('/students')
    .send(studentData);

    createdStudentId =studentResponse.body.id

    expect(studentResponse.body.name).toBe(studentData.name);
    expect(studentResponse.body.generation).toBe(studentData.generation);
    expect(studentResponse.body.teamId).toBe(studentData.teamId);
  });

  it('/students/:id (GET) - Find by ID from previous test', async () => {
    const response = await request(app.getHttpServer())
      .get(`/students/${createdStudentId}`)
      .expect(200);

    expect(response.body.name).toBe('John Doe');
  });

  it('/students (GET)', async () => {

    const studentResponse = await request(app.getHttpServer())
      .get('/students')
      .expect(200);

    expect(studentResponse.body.length).toBe(1);
    expect(studentResponse.body[0].name).toBe('John Doe');
    expect(studentResponse.body[0].generation).toBe(2024);
    expect(studentResponse.body[0].teamId).toBe(createdTeamId);
  });

  it('/students/withTeamName (GET)', async () => {

    const studentResponse = await request(app.getHttpServer())
      .get('/students/withTeamName')
      .expect(200);

    console.log(studentResponse.body)
    expect(studentResponse.body.length).toBe(1);
    expect(studentResponse.body[0].name).toBe('John Doe');
    expect(studentResponse.body[0].generation).toBe(2024);
    expect(studentResponse.body[0].teamName).toBe('Team A');
  });
});