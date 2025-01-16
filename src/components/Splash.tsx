import { Movie } from "@prisma/client";

export function Splash({featured}: {featured: Movie}) {
  return (<div>
    Orignal de LITEFLIX
    <h1>{featured.name}</h1>
    <div>
      <button>Reproducir</button>
      <button>Mi Lista</button>
    </div>
  </div>);
}