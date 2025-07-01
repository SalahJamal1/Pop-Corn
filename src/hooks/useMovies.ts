import { createContext, useContext } from "react";
import type { MovieContextType } from "../context/MoviesContext";

export const MovieProvider = createContext<MovieContextType | null>(null);

export function useMovies(): MovieContextType | undefined {
  const x: MovieContextType | null = useContext(MovieProvider);
  if (x === undefined || x === null) {
    throw new Error("Something was wrong");
    return;
  }
  return x;
}
