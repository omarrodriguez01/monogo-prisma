import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  async findById(id: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findAllWithTeamName(): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: {
        team: {
          name: {
            not: null,
          },
        },
      },
    });
  }

  async create(data: {
    name: string;
    generation: number;
    teamId: string;
  }): Promise<Student | null> {
    return this.prisma.student.create({
      data: {
        name: data.name,
        generation: data.generation,
        team: {
          connect: {
            id: data.teamId,
          },
        },
      },
    });
  }
}
