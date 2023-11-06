import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  musicUrl: string;

  @ApiProperty()
  coverUrl: string;
}
