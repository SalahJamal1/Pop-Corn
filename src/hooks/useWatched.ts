import { useCallback, useState } from "react";
export type Watched = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};
const tempWatchedData: Watched[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
function useWatched() {
  const [watched, setWatched] = useState<Watched[]>(tempWatchedData);
  const onAdd = useCallback((value: Watched): void => {
    setWatched((prev) => [...prev, value]);
  }, []);
  const onDelete = useCallback((id: string): void => {
    setWatched((prev) => prev.filter((mov) => mov.imdbID != id));
  }, []);

  return { watched, onAdd, onDelete };
}

export default useWatched;
