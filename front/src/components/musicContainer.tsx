// Importações necessárias
import { usePlayer } from "@/contexts/playerContext";
import { MusicData } from "@/schemas/music.schema";
import Image from "next/image";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { TbPlayerStop } from "react-icons/tb";

// Interface de propriedades
interface IMusicContainerProps {
  music: MusicData;
}

// Componente MusicContainer
const MusicContainer = ({ music }: IMusicContainerProps) => {
  const { setCurrentMusic, currentMusic } = usePlayer();
  const isPlaying = currentMusic.music_url === music.music_url;

  return (
    <div className=" shadow-inner shadow-blue-800 bg-gray-800 text-gray-100 rounded-lg pt-4 pl-4 pr-4 mb-8">
      <p className="text-3xl font-semibold">{music.name}</p>
      <div className="relative mt-4">
        <Image
          className="rounded-lg"
          src={music.cover_image}
          alt="Nome da Música"
          width={300}
          height={300}
          layout="responsive" // Usando layout responsivo
          objectFit="cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.3vw" // Adicionando sizes
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              setCurrentMusic(music, true);
            }}
            className="text-gray-100 bg-pink-500 rounded-full p-2 hover:bg-pink-600 transition duration-300 ease-in-out">
            {isPlaying ? (
              <TbPlayerStop className="w-8 h-8" />
            ) : (
              <BsFillPlayCircleFill className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl">
          <strong>Artista:</strong> {music.artist}
        </p>
        <p className="text-xl">
          <strong>Álbum:</strong> {music.album}
        </p>
        <p className="text-xl">
          <strong>Gênero:</strong> {music.genre}
        </p>
        <p className="text-xl">
          <strong>Ano:</strong> {music.year}
        </p>
      </div>
    </div>
  );
};

export default MusicContainer;
