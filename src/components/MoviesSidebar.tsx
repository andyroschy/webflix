import { Movie } from "@prisma/client";
import { buildImgUrl } from "@src/lib/utils";

interface Props {
  movies: Movie[];
}
export function MoviesSideBar({ movies }: Props) {
  return (
    <div>
      <div>
        <span>Ver:</span>Populares
      </div>
      <ul>
        {movies.map((m) => (
          <MoviePreview key={m.id} movie={m} />
        ))}
      </ul>
    </div>
  );
}

function MoviePreview({ movie }: { movie: Movie }) {
  return (
    <li
      className="flex flex-col justify-end pb-4 w-60 h-36 mb-8 text-white"
      style={{
        backgroundImage: `url(${buildImgUrl(movie.image_url, "preview")}`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className="text-center inline-block w-full text-base tracking-[4px]">
        {movie.name}
      </span>
    </li>
  );
}
