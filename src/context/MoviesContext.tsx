import { useCallback, useMemo, useState, type ReactNode } from "react";
import { MovieProvider } from "../hooks/useMovies";
import { FindMovies, type MovieType } from "../hooks/FindMovies";
import { FindMovie } from "../hooks/FindMovie";
import type { MovieType as movieType } from "../hooks/FindMovie";
import type { Watched } from "../hooks/useWatched";
import useWatched from "../hooks/useWatched";

export type MovieContextType = {
  watched: Watched[];
  query: string;
  setQuery: (query: string) => void;
  movies: MovieType[];
  error: string;
  loader: boolean;
  select: null | string;
  isMovieSelect: (select: string) => void;
  onClose: () => void;
  movie: movieType;
  isLoading: boolean;
  onAdd: (value: Watched) => void;
  onDelete: (id: string) => void;
};

export default function MoviesContext({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState<string>("");
  const [select, isSelect] = useState<null | string>(null);
  const { movies, error, loader } = FindMovies(query);
  const { movie, isLoading } = FindMovie(select ?? "");
  const { watched, onAdd, onDelete } = useWatched();
  const isMovieSelect = useCallback((value: string): void => {
    isSelect((s) => (s === value ? null : value));
  }, []);
  const onClose = useCallback((): void => {
    isSelect(null);
  }, []);
  const value: MovieContextType = useMemo(() => {
    return {
      watched,
      movie,
      isLoading,
      select,
      query,
      movies,
      error,
      loader,
      setQuery,
      onClose,
      isMovieSelect,
      onAdd,
      onDelete,
    };
  }, [
    watched,
    movie,
    isLoading,
    select,
    query,
    movies,
    error,
    loader,
    setQuery,
    isMovieSelect,
    onClose,
    onAdd,
    onDelete,
  ]);
  return (
    <MovieProvider.Provider value={value}>{children}</MovieProvider.Provider>
  );
}
