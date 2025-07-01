import { useMovies } from "../hooks/useMovies";
import Watch from "./Watch";

export default function WatchedList() {
  const { watched } = useMovies()!;
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watch movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
