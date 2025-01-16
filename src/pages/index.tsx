import "./index.css";
import { Bebas_Neue } from "next/font/google";
import type { Movie } from "@prisma/client";
import { FEATURED_FILM } from "@src/lib/endpoints";
import { Header} from "@src/components/Header";
import { Splash } from "@src/components/Splash";
import { MoviesSideBar } from "@src/components/MoviesSidebar";

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
});

const placeholder = {id:0, image_url: '', name: '', vote_average: 1};

export default function Home({
  featured,
  popular,
}: {
  featured: Movie[];
  popular: Movie[];
}) {
  return (
    <div className={bebas.className}>
      <Header />
      <Splash featured={placeholder}/>
      <MoviesSideBar movies={[placeholder, placeholder]}></MoviesSideBar>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(FEATURED_FILM);
  const featured = await res.json();

  return {
    props: { featured },
  };
}
