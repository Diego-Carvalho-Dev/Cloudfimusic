import { useMusic } from "@/contexts/musicContext";
import { ImMusic } from "react-icons/im";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion"; // Importe o motion

const UploadMusicForm = () => {
  const { setPage, musicInfo, setMusicInfo, setMusic } = useMusic();

  const onDrop = (files: File[]) => {
    setMusic(files[0]);
  };

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"]
    }
  });
  const { getRootProps, getInputProps } = dropzone;

  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  };

  return (
    <motion.div
      className="rounded-2xl container bg-gray-950 flex justify-center"
      initial="initial" // Define a animação inicial
      animate="animate" // Define a animação a ser aplicada
      variants={pageVariants} // Define as variantes de animação
    >
      <div className="w-[90%]">
        <p className="text-4xl my-6 font-semibold text-center">Salvar música</p>
        <div className="flex flex-row justify-center mb-6">
          <div className="bg-gray-400 w-5 h-5 m-1 rounded-full"></div>
          <div className="bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[50%] md:min-h-[400px]">
            <div className="flex justify-center md:pr-6">
              <div className="w-full md:w-[80%] min-w-[300px]">
                <label htmlFor="name" className="user-form-label">
                  Nome
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="text"
                    className="user-form-input"
                    value={musicInfo.name}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, name: e.target.value });
                    }}
                    placeholder="Iron man"
                  />
                </div>
                <label htmlFor="album" className="user-form-label">
                  Álbum
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="text"
                    className="user-form-input"
                    value={musicInfo.album}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, album: e.target.value });
                    }}
                    placeholder="Paranoid"
                  />
                </div>
                <label htmlFor="artist" className="user-form-label">
                  Artista
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="text"
                    className="user-form-input"
                    value={musicInfo.artist}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, artist: e.target.value });
                    }}
                    placeholder="Black Sabbath"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            {...getRootProps()}
            className="flex flex-col md:w-[50%] min-w-[300px] min-h-[200px] md:min-h-[400px] bg-blue-900 rounded-lg border-double border-4 border-gray-400">
            <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
              <div className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2">
                <ImMusic className="fill-gray-200 w-16 h-16 m-4" />
                <p className="text-3xl text-center">Arraste e solte o áudio aqui </p>
                <p className="text-3xl mt-4">- OU -</p>
                <button className="user-form-button w-48 my-8" onClick={(e) => e.preventDefault()}>
                  Busque aqui
                </button>
                <p className="text-lg italic font-gray-200">Áudios suportados: mp3</p>
              </div>
            </label>
            <input className="hidden" {...getInputProps()} />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="user-form-button w-32 my-8"
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}>
            Próximo
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadMusicForm;
