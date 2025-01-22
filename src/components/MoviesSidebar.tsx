import { Movie } from "@prisma/client";
import { IconChevronDown } from "@src/icons/chevron-down";
import { IconPlay } from "@src/icons/play";
import { IconStar } from "@src/icons/star";
import { buildImgUrl } from "@src/lib/utils";

interface Props {
  movies: Movie[];
}
export function MoviesSideBar({ movies }: Props) {
  return (
    <div>
      <div className="text-center text-lg tracking-[4px] leading-5 mb-8 drop-shadow-titlesm cursor-pointer">
        <span>
          <span>Ver:</span>
          <span className="font-bold ">Populares</span>
        </span>
        <IconChevronDown className="align-middle inline-block ml-2" />
      </div>
      <ul>
        {movies.map((m) => (
          <MoviePreview key={m.id} movie={m} />
        ))}
      </ul>
    </div>
  );
}

interface PreviewProps {
  movie: Props["movies"][0];
}

function MoviePreview({ movie }: PreviewProps) {
  return (
    <li
      className=" relative left-0 top-0 rounded-mdsm w-55 h-36 mb-8 cursor-pointer group/container"
      style={{
        backgroundImage: `url(${buildImgUrl(movie.image_url, "preview")}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <DefaultState movie={movie} />
      <HoverState movie={movie} />
    </li>
  );
}

function DefaultState({ movie }: Pick<PreviewProps, "movie">) {
  return (
    <div className="transition-opacity absolute left-0 top-0 flex flex-col justify-end items-center pb-4 w-full h-full text-white group-hover/container:opacity-0 opacity-100 ">
      <button className="w-10 h-10 mb-4 border-1 border-white border-solid rounded-[100px] bg-[#24242480]">
        <IconPlay color="white" className="align-middle inline-block " />
      </button>
      <span className="text-center inline-block w-full text-base tracking-[4px] drop-shadow-titlesm">
        {movie.name}
      </span>
    </div>
  );
}

function HoverState({ movie }: Pick<PreviewProps, "movie">) {
  return (
    <div className="transition-opacity absolute left-0 top-0 flex flex-col justify-end items-center pb-4 w-full h-full text-white  cursor-pointer opacity-0 group-hover/container:opacity-100 p-6 bg-[#24242478]">
      <div className="w-full flex flex-row justify-start mb-4">
        <button className="group/icon w-6 h-6 min-w-6 border-1 border-white hover:border-black border-solid rounded-[100px] bg-[#24242480] hover:bg-teal-400">
          <IconPlay
            className="align-middle inline-block"
            width={"12"}
            height={"12"}
            pathProps={{
              className:
                "stroke-white group-hover/icon:stroke-black group-hover/icon:fill-black",
            }}
          />
        </button>
        <span className="text-center inline-block w-full text-base tracking-[4px] drop-shadow-titlesm">
          {movie.name}
        </span>
      </div>
      <div className="flex flex-row w-full justify-between tracking-[2px] text-sm leading-3">
        <IconStar className="align-middle inline-block mr-1"></IconStar>
        <span>{movie.vote_average}</span>
        <span className="w-full tracking-[4px] drop-shadow-titlesm text-right">
          {movie.release_date?.getFullYear()}
        </span>
      </div>
    </div>
  );
}
