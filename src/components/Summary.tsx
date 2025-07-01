import { useMovies } from "../hooks/useMovies";

export default function Summary() {
  const { watched } = useMovies()!;
  const average = (arr: number[]): number =>
    arr.reduce(
      (acc: number, cur: number, i: number, arr) => acc + cur / arr.length,
      0
    );
  const avgImdbRating: number =
    Math.round(average(watched.map((MovieType) => MovieType.imdbRating)) * 10) /
    10;
  const avgUserRating: number =
    Math.round(average(watched.map((MovieType) => MovieType.userRating)) * 10) /
    10;
  const avgRuntime: number =
    Math.trunc(average(watched.map((MovieType) => MovieType.runtime)) * 10) /
    10;
  return (
    <div className="summary">
      <h2>MovieTypes you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} MovieTypes</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
