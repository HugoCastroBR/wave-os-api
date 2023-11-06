import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { MusicModule } from './music/music.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    HealthModule,
    AuthModule,
    MusicModule,
    MulterModule.register({
      dest: './upload/files',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
