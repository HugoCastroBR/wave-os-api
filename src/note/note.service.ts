import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto) {
    return await this.prisma.text.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
      },
    });
  }

  async findAll() {
    return await this.prisma.text.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.text.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    return await this.prisma.text.update({
      where: {
        id: id,
      },
      data: {
        title: updateNoteDto.title,
        content: updateNoteDto.content,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.text.delete({
      where: {
        id: id,
      },
    });
  }
}
