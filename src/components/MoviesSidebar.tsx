import { Movie } from "@prisma/client"

interface Props {
  movies: Movie[];
}
export function MoviesSideBar({movies}: Props) {
  return <div>
    <div><span>Ver:</span>Populares</div>
    <ul>
      {movies.map((m) => <MoviePreview key={m.id} movie={m} />)}
    </ul>
  </div>
}

function MoviePreview({movie}: {movie: Movie}) {
  return (<li>
    {movie.name}
  </li>);
}