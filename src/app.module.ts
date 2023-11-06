import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { MusicModule } from './music/music.module';
import { MulterModule } from '@nestjs/platform-express';
import { TodoModule } from './todo/todo.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    UsersModule,
    HealthModule,
    AuthModule,
    MusicModule,
    MulterModule.register({
      dest: './upload/files',
    }),
    TodoModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
