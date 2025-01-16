import "./index.css";
import { Bebas_Neue } from "next/font/google";
import type { Movie } from "@prisma/client";
import { FEATURED_FILM } from "@src/lib/endpoints";
import { Header } from "@src/components/Header";
import { Splash } from "@src/components/Splash";
import { MoviesSideBar } from "@src/components/MoviesSidebar";
import { prisma } from "@src/lib/prisma";
import { Suspense, use, useEffect, useState } from "react";

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
}

interface QueryState<T, TError> {
  promise: Promise<any> | null;
  isFetching: boolean;
  data: T | null;
  error: TError | null;
}

const placeholder = { id: 0, image_url: "", name: "", vote_average: 1 };

export default function Home({
  featured,
  popular,
}: {
  featured: Movie[];
  popular: Movie[];
}) {
  const [{ data: movies }, setMovieQueryState] = useState<
    QueryState<Movie[], any>
  >({
    data: null,
    error: null,
    isFetching: false,
    promise: null,
  });
  const [featuredM, ...sidebarMvoies] = movies ?? [placeholder];

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

  return (
    <div className={bebas.className}>
      <Suspense fallback={"loading..."}>
        <Header />
        <Splash featured={featuredM} />
        <MoviesSideBar movies={sidebarMvoies}></MoviesSideBar>
      </Suspense>
    </div>
  );
}

export async function fetchMovies() {
  const res = await fetch(FEATURED_FILM);
  const response: MovieReponse = await res.json();

  const mappedResult = response.results.map((r) => ({
    id: r.id,
    image_url: r.backdrop_path,
    name: r.title,
    vote_average: r.vote_average,
  }));

  // we can 'fire and forget' here, no need to await for the DB
  // since we don't need the results back to continue
  // persistMissing(mappedResult);

  return mappedResult;
}

/**
 * @description Given an array of movies, this method persists those that are missing on the database.
 */
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
    // in a real world applicaiotion proper error handling would include
    // logging to monitoring tools like grafana, retrying retryable errors, etc
    console.error(error);
  }
}
