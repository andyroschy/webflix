import "./index.css";
import { Bebas_Neue } from "next/font/google";
import type { Movie } from "@prisma/client";
import { FEATURED_FILM } from "@src/lib/endpoints";

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home({
  featured,
  popular,
}: {
  featured: Movie[];
  popular: Movie[];
}) {
  return (
    <div className={bebas.className}>
      <h1 className="text-4xl">Liteflix Challenge </h1>
      <p> Replace this page with your implementation </p>
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
