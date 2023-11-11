import { CreateMusicDto } from "src/modules/musics/dtos/create-music.dtos"
import { UpdateMusicDto } from "../../dtos/update-music.dto"
import { MusicsRepository } from "../musics.repository"
import { Music } from "../../entities/music.entitie"



export class MusicsInmemoryRepository implements MusicsRepository {
    update(data: UpdateMusicDto, id: string): Promise<Music> {
        throw new Error("Method not implemented.")
    }

    private database: Music[] = []

    async create(data: CreateMusicDto): Promise<Music> {
        const newMusic = new Music()
        Object.assign(newMusic, {
            ...data
        })
        this.database.push(newMusic)
        return newMusic
    }
    async findAll(): Promise<Music[]> {
        return this.database
    }
    async findOne(id: string): Promise<Music> {
        const music = this.database.find(music => music.id == id)
        return music;
    }
}