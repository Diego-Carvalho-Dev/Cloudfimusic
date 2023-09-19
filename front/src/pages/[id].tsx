import MusicContainer from "@/components/musicContainer";
import { MusicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface MusicProps {
  music: MusicData;
}

const Music: NextPage<MusicProps> = ({ music }: MusicProps) => {
  return (
    <main className="body min-h-screen p-6">
      <Link href={"/"} className="btn-primary">
        voltar
      </Link>
      <div className="flex itens-center justify-center pt-8">
        <MusicContainer music={music} />
      </div>
    </main>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<MusicProps> = async (ctx) => {
  const id = ctx.params!.id;
  const response = await api.get<MusicData>(`/musics/${id}`);

  return { props: { music: response.data }, revalidate: 60 };
};

export default Music;
