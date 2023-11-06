import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({
    default: '',
    required: false,
  })
  title?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  content?: string;
}
