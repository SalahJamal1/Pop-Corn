import type { MovieType } from "../hooks/FindMovies";
import { useMovies } from "../hooks/useMovies";

type MovieProps = {
  movie: MovieType;
};

export default function Movie({ movie }: MovieProps) {
  const { isMovieSelect } = useMovies()!;
  return (
    <li key={movie.imdbID} onClick={() => isMovieSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
