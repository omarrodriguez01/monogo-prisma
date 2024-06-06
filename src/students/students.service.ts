import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return [];
  }

  async findById(id: string): Promise<Student | null> {
    return null;
  }

  async findAllWithTeamName(): Promise<Student[]> {
    return [];
  }

  async create(data: { name: string; generation: number; teamId: string }): Promise<Student | null> {
    return null;
  }
}
