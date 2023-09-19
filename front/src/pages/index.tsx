import Card from "@/components/card";
import { usePlayer } from "@/contexts/playerContext";
import { MusicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Importe o motion

interface HomeProps {
  musics: MusicData[];
}

const Home: NextPage<HomeProps> = ({ musics }) => {
  const { setPlaylist } = usePlayer();

  useEffect(() => {
    setPlaylist(musics);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.main
      className={`body min-h-screen p-4 `}
      initial="initial" // Define a animação inicial
      animate="animate" // Define a animação a ser aplicada
      variants={pageVariants} // Define as variantes de animação
    >
      <div className="flex justify-end p-6">
        <motion.div
          variants={linkVariants} // Define as variantes de animação para o link
          whileHover="hover"
          whileTap="tap">
          <Link href={"/upload"} className="btn-primary">
            Nova música
          </Link>
        </motion.div>
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center">
        {musics.map((music) => {
          return <Card key={music.id} music={music} />;
        })}
      </div>
    </motion.main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<MusicData[]>("/musics");

  return {
    props: { musics: response.data }
  };
};

export default Home;
