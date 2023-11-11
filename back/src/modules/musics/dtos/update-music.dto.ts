import { PartialType } from "@nestjs/swagger";
import { CreateMusicDto } from "./create-music.dtos";



export class UpdateMusicDto extends PartialType(CreateMusicDto) {}