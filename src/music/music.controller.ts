import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { ApiTags, ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MusicFileDto } from './dto/music-file.dto';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { t } from 'i18next';
@ApiTags('music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @Post('upload/:artist/:title')
  @ApiBody({
    type: MusicFileDto, // Substitua pelo DTO apropriado se você tiver um definido
    description: 'Arquivo .mp3 a ser carregado',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const partes: string[] = req.url.split('/');
          const artistName = partes[3];
          const musicName = partes[4];
          const genRandomNumber = () => {
            return Math.floor(Math.random() * 12345678);
          };

          const FolderName = genRandomNumber();

          fs.mkdirSync(`../wave-os-next/public/songs/${FolderName}`, {
            recursive: true,
          });
          cb(null, `../wave-os-next/public/songs/${FolderName}`);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @ApiResponse({
    status: 200,
    description: 'Arquivos carregados com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Falha no upload dos arquivos' })
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    if (!files || files.length !== 2) {
      throw new BadRequestException(
        'Dois arquivos (MP3 e imagem) devem ser carregados',
      );
    }

    const mp3File = files.find(
      (file) => file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3',
    );
    const imageFile = files.find(
      (file) => file.mimetype === 'image/jpeg' || file.mimetype === 'image/png',
    );

    if (!mp3File || !imageFile) {
      throw new BadRequestException(
        'Os arquivos carregados devem incluir um arquivo MP3 e uma imagem (JPEG ou PNG).',
      );
    }

    const mp3DirPartes: string[] = mp3File.destination.split('/');
    const mp3Dir = `${mp3DirPartes[3]}/${mp3DirPartes[4]}`;

    const imageDirPartes: string[] = imageFile.destination.split('/');
    const imageDir = `${imageDirPartes[3]}/${imageDirPartes[4]}`;

    // Aqui você pode processar os arquivos, movê-los para os locais desejados, salvar informações no banco de dados, etc.

    const artist = req.url
      .split('/')[3]
      .replaceAll('_', ' ')
      .replaceAll('%20', ' ')
      .replaceAll('-%20', '- ');
    const title = req.url
      .split('/')[4]
      .replaceAll('_', ' ')
      .replaceAll('%20', ' ')
      .replaceAll('-%20', '- ');

    const result = await this.musicService.create({
      artist: artist,
      title: title,
      coverUrl: `${imageDir}/image.jpg`,
      musicUrl: `${mp3Dir}/sound.mp3`,
    });

    return result;
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
  //   return this.musicService.update(+id, updateMusicDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.musicService.removeAll();
  }
}
