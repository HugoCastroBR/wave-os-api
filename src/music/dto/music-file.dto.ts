import { ApiProperty } from '@nestjs/swagger';

export class MusicFileDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    example: ['file1', 'file2'],
  })
  files: any[];

  @ApiProperty({
    required: true,
    type: 'string',
  })
  title: string;
}
