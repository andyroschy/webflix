import { Movie } from "@prisma/client";
import { IconPlay } from "@src/icons/play";
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
      className="flex flex-col justify-end items-center pb-4 w-60 h-36 mb-8 text-white rounded-sm cursor-pointer"
      style={{
        backgroundImage: `url(${buildImgUrl(movie.image_url, "preview")}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <button className="w-10 h-10 mb-4 border-1 border-white border-solid rounded-[100px] bg-[#24242480]">
        <IconPlay color="white" className="align-middle inline-block " />
      </button>
      <span className="text-center inline-block w-full text-base tracking-[4px] drop-shadow-titlesm">
        {movie.name}
      </span>
    </li>
  );
}
