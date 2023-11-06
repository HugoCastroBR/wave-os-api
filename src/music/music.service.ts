import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MusicService {
  constructor(private prisma: PrismaService) {}
  async create(createMusicDto: CreateMusicDto) {
    return await this.prisma.musicFile.create({
      data: {
        artist: createMusicDto.artist,
        title: createMusicDto.title,
        coverUrl: createMusicDto.coverUrl,
        musicUrl: createMusicDto.musicUrl,
      },
    });
  }

  findAll() {
    return this.prisma.musicFile.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} music`;
  }

  // update(id: number, updateMusicDto: UpdateMusicDto) {
  //   return `This action updates a #${id} music`;
  // }

  async remove(id: number) {
    return await this.prisma.musicFile.delete({
      where: {
        id: id,
      },
    });
  }

  async removeAll() {
    return await this.prisma.musicFile.deleteMany({});
  }
}
