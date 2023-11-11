import { PrismaService } from 'src/database/prisma.service';
import { MusicsRepository } from '../musics.repository';
import { Injectable } from '@nestjs/common';
import { UpdateMusicDto } from '../../dtos/update-music.dto';
import { CreateMusicDto } from '../../dtos/create-music.dtos';
import { Music } from '../../entities/music.entitie';

@Injectable()
export class MusicsPrismaRepository implements MusicsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, {
      ...data,
    });

    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId
      },
    });
    return newMusic;
  }
  async findAll(): Promise<Music[]> {
    const musics = await this.prisma.music.findMany();
    return musics;
  }
  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findFirst({
      where: { id },
    });
    return music;
  }

  async update(data: UpdateMusicDto, id: string): Promise<Music> {
    const music = await this.prisma.music.update({
      where: {id}, 
      data: {...data}
    })
    return music
  }
}