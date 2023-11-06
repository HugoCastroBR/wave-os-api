import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    default: '',
    required: false,
  })
  content?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  title?: string;

  @ApiProperty({
    default: false,
    required: false,
  })
  isDone?: boolean;
}
