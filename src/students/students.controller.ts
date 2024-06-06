import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get('/withTeamName')
  async findAllWithTeamName(): Promise<Student[]> {
    return this.studentsService.findAllWithTeamName();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Student | null> {
    return this.studentsService.findById(id);
  }

  @Post()
  create(
    @Body()
    createStudentDto: {
      name: string;
      generation: number;
      teamId: string;
    },
  ): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }
}
