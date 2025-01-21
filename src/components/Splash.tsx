import { Movie } from "@prisma/client";

export function Splash({ featured }: { featured: Movie }) {
  return (
    <div className="flex flex-col justify-end mb-8">
      Orignal de LITEFLIX
      <h1 className="text-title text-teal-300">{featured.name}</h1>
      <div>
        <button>Reproducir</button>
        <button>Mi Lista</button>
      </div>
    </div>
  );
}
