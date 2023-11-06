import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        content: createTodoDto.content,
        isDone: false,
      },
    });
  }

  async findAll() {
    return await this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: updateTodoDto.title,
        content: updateTodoDto.content,
        isDone: updateTodoDto.isDone,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({
      where: {
        id: id,
      },
    });
  }

  async removeAll() {
    return await this.prisma.todo.deleteMany({});
  }
}
