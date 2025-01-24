import { IconChevronDown } from "@src/icons/chevron-down";
import { IconPlay } from "@src/icons/play";
import { IconStar } from "@src/icons/star";
import { SerializableMovie } from "@src/lib/types";
import { buildImgUrl } from "@src/lib/images";
import { useState } from "react";
import { DropDown, DropdownOption } from "./dropdown";

interface Props {
  popular: SerializableMovie[];
  myMovies: SerializableMovie[];
}

const dropdownOptions: DropdownOption[] = [
  {
    id: "popular",
    label: "Populares",
  },
  {
    id: "my-movies",
    label: "Mis Películas",
  },
]; 

export function PopularFilms({ popular, myMovies }: Props) {
  const [selectedFilter, setSelectedFilter] = useState(dropdownOptions[0]);
  const [displayedMovies, setDisplayedMovies] = useState(popular);

  return (
    <div>
      <div className="text-center text-lg tracking-[4px] leading-5 mt-[72px] mb-8">
        <span>Ver:</span>
        <DropDown
          id="featured-selector"
          selectedOptionId={selectedFilter.id}
          options={dropdownOptions}
          onSelect={(o) => {
            setSelectedFilter(o);
            if (o.id === 'my-movies') {
              setDisplayedMovies(myMovies);
            } else {
              setDisplayedMovies(popular);
            }
          }}
          className="hover:drop-shadow-titlesm cursor-pointer"
        >
          {selectedFilter.label}
          <IconChevronDown className="align-middle inline-block ml-2" />
        </DropDown>
      </div>
      <ul>
        {displayedMovies.map((m) => (
          <MoviePreview key={m.id} movie={m} />
        ))}
      </ul>
    </div>
  );
}

interface PreviewProps {
  movie: Props["popular"][0];
}

function MoviePreview({ movie }: PreviewProps) {
  return (
    <li
      className=" relative left-0 top-0 rounded-smd w-55 h-38 mb-5 cursor-pointer group/container"
      style={{
        backgroundImage: `url(${buildImgUrl(movie.image_url, "preview")})`,
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
    <div className="transition-opacity absolute left-0 top-0 flex flex-col justify-end items-center pb-3 w-full h-full text-white group-hover/container:opacity-0 opacity-100 ">
      <button className="w-10 h-10 mb-4 border-1 border-white border-solid rounded-full bg-[#24242480]">
        <IconPlay
          color="white"
          width={"18px"}
          height={"18px"}
          className="align-middle inline-block "
        />
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
      <div className="w-full flex flex-row justify-start mb-5">
        <button className="mt-auto group/icon w-6 h-6 min-w-6 border-1 border-white hover:border-black border-solid rounded-[100px] bg-[#24242480] hover:bg-teal-400">
          <IconPlay
            className="align-middle inline-block  group-hover/icon:stroke-black group-hover/icon:fill-black"
            width={"12"}
            height={"12"}
          />
        </button>
        <span className="text-center inline-block w-full text-base tracking-[4px] drop-shadow-titlesm">
          {movie.name}
        </span>
      </div>
      <div className="flex flex-row w-full justify-between tracking-[2px] text-sm leading-3">
        <IconStar className="align-middle inline-block mr-1"></IconStar>
        <span>{movie.vote_average.toFixed(2)}</span>
        <span className="w-full tracking-[4px] drop-shadow-titlesm text-right">
          {new Date(movie.release_date)?.getFullYear()}
        </span>
      </div>
    </div>
  );
}
