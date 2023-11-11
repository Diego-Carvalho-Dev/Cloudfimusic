import { Body, Controller, Get, Param, Post, UseGuards, Request, UploadedFiles, UseInterceptors, Patch } from "@nestjs/common";  // Import Request decorator
import { CreateMusicDto } from "./dtos/create-music.dtos";
import { MusicsService } from "./musics.service";
import { JwtauthGuard } from "../auth/dtos/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

// Other imports...
@ApiTags("Musicas")
@Controller("musics")
export class MusicsController {
    constructor(private musicsService: MusicsService) {}

    @Post()
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
    create(@Body() data: CreateMusicDto, @Request() req) {  // Use @Request() decorator
        return this.musicsService.create(data, req.user.id);
    }

    @Get()
    findAll() {
        return this.musicsService.findAll();
    }

    @Get(":id")
    findOnde(@Param('id') id: string) {
        return this.musicsService.findOnde(id);
    }

    @Patch('upload/:id')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'cover_image', maxCount: 1 },
        { name: 'music', maxCount: 1 },
      ]),
    )
    async upload(
      @UploadedFiles()
      files: { cover_image: Express.Multer.File[]; music: Express.Multer.File[] },
      @Param('id') id: string,
    ) {
      const { cover_image, music } = files;
      return this.musicsService.upload(cover_image[0], music[0], id)
    }
}

