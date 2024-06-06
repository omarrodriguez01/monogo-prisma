import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

    async findById(id: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });
  }

  async findAllWithTeamName(): Promise<Student[]> {
    return this.prisma.student.findMany({
        include: {
          team: true,
        },
      }).then(students => students.map(student => ({
        ...student,
        teamName: student.team.name,
      })));
  }

  async create(data: { name: string; generation: number; teamId: string }): Promise<Student> {
    return this.prisma.student.create({
      data,
    });
  }
}
