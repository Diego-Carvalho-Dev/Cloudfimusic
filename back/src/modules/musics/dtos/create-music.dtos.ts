import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class CreateMusicDto {

    @ApiProperty()
    @IsString()
    name: string; 

    @ApiProperty()
    @IsString()
    album: string;

    @ApiProperty()
    @IsString()
    artist: string;


    @ApiProperty()
    @IsString()
    genre: string;


    @ApiProperty()
    @IsString()
    year: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    cover_image: string | null;


    @ApiProperty()
    @IsString()
    @IsOptional()
    music_url: string | null;

}