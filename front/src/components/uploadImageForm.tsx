import { useMusic } from "@/contexts/musicContext";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const UploadImageForm = () => {
  const { setPage, musicInfo, setMusicInfo, setCoverImage, coverImage, music, createMusic } =
    useMusic();

  const onDrop = useCallback((files: File[]) => {
    setCoverImage(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"]
    }
  });

  const { getRootProps, getInputProps } = dropzone;

  return (
    <div className="rounded-2xl container bg-gray-950 flex justify-center">
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
                <label htmlFor="gender" className="user-form-label">
                  Gênero
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="text"
                    className="user-form-input"
                    placeholder="heavy metal"
                    value={musicInfo.genre}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, genre: e.target.value });
                    }}
                  />
                </div>
                <label htmlFor="year" className="user-form-label">
                  Ano
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="text"
                    className="user-form-input"
                    placeholder="1970"
                    value={musicInfo.year}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, year: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            {...getRootProps()}
            className="flex flex-col md:w-[50%] min-w-[300px] min-h-[200px] md:min-h-[400px] bg-blue-900 rounded-lg border-dashed border-2 border-gray-400">
            <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
              <div className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2">
                <FaImage className="fill-gray-200 w-24 h-20 m-4" />
                <p className="text-3xl text-center">Arrasta e solta a capa aqui</p>
                <p className="text-3xl mt-4">- OU -</p>
                <button className="user-form-button w-48 my-8" onClick={(e) => e.preventDefault()}>
                  Busque aqui
                </button>
                <p className="text-lg italic font-gray-200">Formatos suportados: jpg</p>
              </div>
            </label>
            <input className="hidden" {...getInputProps()} />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex flex-row">
            <div className="flex justify-center items-center mr-6">
              <button
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}>
                <FaArrowLeft className="text-2xl" /> {/* Aqui usamos o ícone no lugar do texto */}
              </button>
            </div>

            <button
              className="user-form-button w-[16.000rem] my-8"
              onClick={(e) => {
                e.preventDefault();
                console.log(musicInfo, music, coverImage);
                createMusic();
              }}>
              Finalizar Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImageForm;
