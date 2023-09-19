import UploadImageForm from "@/components/uploadImageForm";
import UploadMusicForm from "@/components/uploadMusicForm";
import { useMusic } from "@/contexts/musicContext";
import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";

const UploadMusic: NextPage = () => {
  const { page } = useMusic();
  const pageDisplay = () => {
    if (page === 0) {
      return <UploadMusicForm />;
    } else {
      return <UploadImageForm />;
    }
  };
  return (
    <main className="body min-h-screen flex items-center justify-center">
      <form>
        <div>{pageDisplay()}</div>
      </form>
    </main>
  );
};

export default UploadMusic;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies["kenziefy.token"]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
};
