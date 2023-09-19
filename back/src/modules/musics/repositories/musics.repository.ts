import { CreateMusicDto } from '../dtos/create-music.dto';
import { UpdateMusicDto } from '../dtos/update-music.dto';
import { Music } from '../entities/music.entitie';

export abstract class MusicsRepository {
  abstract create(data: CreateMusicDto, userId: string): Promise<Music>;
  abstract findAll(): Promise<Music[]>;
  abstract findOne(id: string): Promise<Music>;
  abstract update(data: UpdateMusicDto, id: string): Promise<Music>;
}
