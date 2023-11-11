import { Module, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicsRepository } from './repositories/musics.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MusicsPrismaRepository } from './repositories/prisma/musics.prisma.repository';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: "./temp",
        filename: (_, file, cb) => {
          cb(null, file.originalname)
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "audio/mpeg") {
          cb(null, true)
        } else {
          cb(new BadRequestException("Only jpeg format allowed"), false)
        }
      }
    })
  ],
  controllers: [MusicsController],
  providers: [
    MusicsService,
    PrismaService,
    {
      provide: MusicsRepository,
      useClass: MusicsPrismaRepository,
    }
  ],
})
export class MusicsModule {}
