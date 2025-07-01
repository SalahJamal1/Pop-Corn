import { useMovies } from "../hooks/useMovies";
import Error from "../ui/Error";
import Loader from "../ui/Loader";
import Movie from "./Movie";

export default function MovieList() {
  const { movies, loader, error } = useMovies()!;

  return (
    <>
      {error && <Error error={error} />}
      {loader && <Loader />}
      {!error && !loader && (
        <ul className="list list-movie">
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </>
  );
}
