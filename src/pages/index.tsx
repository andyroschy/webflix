import "./index.css";
import { Bebas_Neue } from "next/font/google";
import type { Movie } from "@prisma/client";
import { FEATURED_FILM } from "@src/lib/endpoints";
import { Header } from "@src/components/Header";
import { Splash } from "@src/components/Splash";
import { MoviesSideBar } from "@src/components/MoviesSidebar";
import { prisma } from "@src/lib/prisma";
import { Suspense, useEffect, useState } from "react";
import { buildImgUrl } from "@src/lib/utils";

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
});

interface MovieReponse {
  results: MovieResponseModel[];
}
interface MovieResponseModel {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
}

interface QueryState<T, TError> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise: Promise<any> | null;
  isFetching: boolean;
  data: T | null;
  error: TError | null;
}

export default function Home({}: // featured,
// popular,
{
  featured: Movie[];
  popular: Movie[];
}) {
  const [{ data: movies }, setMovieQueryState] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    QueryState<Movie[], any>
  >({
    data: null,
    error: null,
    isFetching: false,
    promise: null,
  });
  useEffect(() => {
    const promise = fetchMovies()
      .then((r) => {
        setMovieQueryState((s) => ({ ...s, data: r, error: null }));
      })
      .catch((e) => {
        setMovieQueryState((s) => ({ ...s, data: null, error: e }));
      })
      .finally(() => {
        setMovieQueryState((s) => ({ ...s, isFetching: false }));
      });
    setMovieQueryState((s) => ({ ...s, isFetching: true, promise: promise }));
  }, []);

  if (!movies) return "loading...";
  const [featuredM, ...sidebarMvoies] = movies;

  return (
    <Suspense fallback={"loading..."}>
      <div
        className={
          "max-w-screen w-screen max-h-screen h-screen " + bebas.className
        }
        style={{
          backgroundImage: `url(${buildImgUrl(featuredM.image_url, "large")}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div
          className={"flex flex-col h-full w-full max-w-screen1440 mx-auto px-25"}
        >
          <Header />
          <div className="flex flex-1 flex-row justify-between">
            <Splash featured={featuredM} />
            <MoviesSideBar movies={sidebarMvoies.slice(0, 4)}></MoviesSideBar>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export async function fetchMovies(): Promise<Movie[]> {
  const res = await fetch(FEATURED_FILM);
  const response: MovieReponse = await res.json();

  const mappedResult = response.results.map(
    (r) =>
      ({
        id: r.id,
        image_url: r.backdrop_path,
        name: r.title,
        vote_average: r.vote_average,
        release_date: new Date(r.release_date),
      } as Movie)
  );

  // we can 'fire and forget' here, no need to await for the DB
  // since we don't need the results back to continue
  // persistMissing(mappedResult);

  return mappedResult;
}

/**
 * @description Given an array of movies, this method persists those that are missing on the database.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function persistMissing(movies: Movie[]) {
  try {
    // since we we are using SQLite, we can't use skipDuplicate
    // see: https://www.prisma.io/docs/orm/prisma-client/queries/crud#create-multiple-records
    const alreadyOnDb = (
      await prisma.movie.findMany({
        where: {
          id: {
            in: movies.map((x) => x.id),
          },
        },
        select: {
          id: true,
        },
      })
    ).reduce((acc, curr) => {
      acc.set(curr.id, curr.id);
      return acc;
    }, new Map<number, number>());

    await prisma.movie.createMany({
      data: movies.filter((x) => !alreadyOnDb.has(x.id)),
    });
  } catch (error) {
    // in a real world application proper error handling would include
    // logging to monitoring tools like grafana, retrying retryable errors, etc
    console.error(error);
  }
}
