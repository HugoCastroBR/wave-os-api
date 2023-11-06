import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMusicDto } from './create-music.dto';

export class UpdateMusicDto extends PartialType(CreateMusicDto) {
  @ApiProperty({
    default: '',
    required: false,
  })
  title?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  artist?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  musicUrl?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  coverUrl?: string;
}
