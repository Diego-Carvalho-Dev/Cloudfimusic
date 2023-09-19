import { usePlayer } from "@/contexts/playerContext";
import { MusicData } from "@/schemas/music.schema";
import Image from "next/image";
import Link from "next/link";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { TbLoader2 } from "react-icons/tb";

interface CardProps {
  music: MusicData;
}

const Card = ({ music }: CardProps) => {
  const { setCurrentMusic, currentMusic } = usePlayer();
  const isPlaying = currentMusic.music_url === music.music_url;

  const handlePlayButtonClick = () => {
    // Iniciar o detener la reproducción de la música
    setCurrentMusic(music, !isPlaying);
  };

  // ... (código anterior)

  return (
    <div className=" shadow-inner shadow-blue-800 flex sm:flex-col bg-gray-800 sm:w-48 w-[100%] sm:h-64 h-34 rounded-lg  overflow-hidden justify-between">
      <Link href={`/${music.id}`}>
        <div className="flex flex-col items-center p-2 text-white transition-transform transform-gpu hover:scale-105 hover:shadow-lg relative">
          <p className=" z-10 relative sm:left-0 left-0 sm:bottom-2 bottom-1 text-base font-semibold mt-2">
            {music.name}
          </p>
          <div className=" sm:opacity-100 opacity-50 sm:w-40 w-40 sm:h-40 sm:relative">
            <Image
              layout="fill"
              objectFit="cover"
              src={music.cover_image}
              alt={`Imagem da música ${music.name}`}
            />
          </div>
          {/* Botão "Saiba Mais" sobreposto à imagem */}
          <div className="absolute top-0 sm:left-0 left-40 sm:w-[w-[68%] h-full flex items-center justify-center sm:opacity-0 transition-opacity hover:opacity-100">
            <button className=" sm:relative sm:right-0 right-36  sm:bottom-0 bottom-2 sm:bg-pink-500 text-white px-2 sm:py-1 pt-7 rounded-lg text-xs">
              Saiba Mais
            </button>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center bg-gray-900 h-12 rounded-b-lg">
        <button
          onClick={handlePlayButtonClick}
          className={`text-pink-500 p-2 transition-colors ${
            isPlaying ? "hover:text-pink-400" : "hover:text-pink-700"
          }`}>
          {isPlaying ? (
            <div className="w-8 h-8 animate-spin">
              <TbLoader2 className="w-8 h-8" />
            </div>
          ) : (
            <BsFillPlayCircleFill className="w-8 h-8" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
