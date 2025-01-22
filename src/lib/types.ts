import { Movie } from "@prisma/client";

export type SerializableMovie = Omit<Movie, "release_date"> & { release_date: string };
