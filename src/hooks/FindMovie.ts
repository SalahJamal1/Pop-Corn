import { useEffect, useState } from "react";
import { apiMovie } from "../services/apiMovies";
export type MovieType = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};
export function FindMovie(select: string) {
  const [movie, setMovie] = useState<MovieType>({} as MovieType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!select) return;
    const abortController = new AbortController();
    async function findMoviesByQuery() {
      setIsLoading(true);
      try {
        const data = await apiMovie(select, abortController);
        if (data.Response === "False")
          throw new Error(
            data.Error || "Something went wrong while fetching movie. 💥"
          );
        setMovie(data);
        setIsLoading(false);
      } catch (err: unknown) {
        if (abortController.signal.aborted) return;

        console.log(err);
      }
    }
    findMoviesByQuery();
    return () => {
      abortController.abort();
    };
  }, [select]);
  return { movie, isLoading };
}
