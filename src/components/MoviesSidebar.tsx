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
      className=" relative left-0 top-0 rounded-sm w-60 h-36 mb-8 cursor-pointer group/container"
      style={{
        backgroundImage: `url(${buildImgUrl(movie.image_url, "preview")}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="transition-opacity absolute left-0 top-0 flex flex-col justify-end items-center pb-4 w-60 h-36 text-white rounded-sm group-hover/container:opacity-0 opacity-100 ">
        <button className="w-10 h-10 mb-4 border-1 border-white border-solid rounded-[100px] bg-[#24242480]">
          <IconPlay color="white" className="align-middle inline-block " />
        </button>
        <span className="text-center inline-block w-full text-base tracking-[4px] drop-shadow-titlesm">
          {movie.name}
        </span>
      </div>
      <div className="transition-opacity absolute left-0 top-0 flex flex-col justify-end items-center pb-4 w-60 h-36 text-white rounded-sm cursor-pointer opacity-0 group-hover/container:opacity-100 p-6 bg-[#24242478]">
        <div className="w-full flex flex-row justify-start">
          <button className="group/icon w-6 h-6 min-w-6 mb-4 border-1 border-white hover:border-black border-solid rounded-[100px] bg-[#24242480] hover:bg-teal-400">
            <IconPlay className="align-middle inline-block" pathProps={{className: 'stroke-white group-hover/icon:stroke-black'}} />
          </button>
          <span className="text-center inline-block w-full text-base tracking-[4px] drop-shadow-titlesm">
            {movie.name}
          </span>
        </div>
        <div className="flex flex-row w-full justify-between">
          <span>*{movie.vote_average}</span>
          <span className="tinline-block w-full text-base tracking-[4px] drop-shadow-titlesm text-right">
            {movie.release_date?.getFullYear()}
          </span>
        </div>
      </div>
    </li>
  );
}
