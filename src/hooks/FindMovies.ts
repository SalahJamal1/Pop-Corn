import { useEffect, useState } from "react";
import { apiMovies } from "../services/apiMovies";
export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const tempMovieTypeData: MovieType[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
export function FindMovies(query: string) {
  const [movies, setMovie] = useState<MovieType[]>(tempMovieTypeData);
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    const abortController = new AbortController();
    async function findMoviesByQuery() {
      setLoader(true);
      setError("");
      try {
        if (query.length < 2) {
          setError("");
          setLoader(false);
          setMovie(tempMovieTypeData);
          return;
        }
        const data = await apiMovies(query, abortController);
        if (data.Response === "False")
          throw new Error(
            data.Error || "Something went wrong while fetching movies. 💥"
          );
        setMovie(data!.Search);
      } catch (err: unknown) {
        if (abortController.signal.aborted) return;
        if (err instanceof Error) {
          setError(err.message);
          console.log(err);
        } else {
          console.log(err);
        }
      } finally {
        setLoader(false);
      }
    }
    findMoviesByQuery();
    return () => {
      abortController.abort();
    };
  }, [query]);
  return { movies, error, loader };
}
