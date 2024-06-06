import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '@prisma/client';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Post()
  async create(@Body('name') name: string): Promise<Team> {
    return this.teamsService.create({ name });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findById(id);
  }
}
