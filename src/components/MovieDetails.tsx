import { useEffect, useRef, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import Loader from "../ui/Loader";
import type { Watched } from "../hooks/useWatched";
import Ratings from "./Ratings";

export default function MovieDetails() {
  const [userRating, setUserRating] = useState<number | null>(null);
  const { isLoading, movie, select, onClose, onAdd, watched } = useMovies()!;
  const currentEl = useRef<HTMLButtonElement>(null);
  const isWatched: boolean = watched
    .map((el) => el.imdbID)
    .includes(select ?? "");
  const watchedUserRating: number =
    watched.find((el) => el.imdbID === select)?.userRating ?? 0;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,

    Genre: genre,
  } = movie;
  useEffect(() => {
    if (title) document.title = title;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);
  useEffect(() => {
    const click = (e: Event): void => {
      e.preventDefault();
      onClose();
    };

    const keyhandler = (e: KeyboardEvent): void => {
      if (e.code === "Escape") onClose();
    };

    const buttonEl = currentEl.current;
    buttonEl?.addEventListener("click", click);
    document.querySelector("body")?.addEventListener("keydown", keyhandler);
    return () => {
      buttonEl?.removeEventListener("click", click);
      document
        .querySelector("body")
        ?.removeEventListener("keydown", keyhandler);
    };
  }, [onClose]);

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const newMovie: Watched = {
      imdbID: select ?? "",
      Title: title,
      Year: year,
      Poster: poster,
      runtime: runtime !== "N/A" ? Number(runtime.split(" ")[0]) : 0,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
    };
    onAdd(newMovie);
    onClose();
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <>
            <header>
              <button className="btn-back" ref={currentEl}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                {isWatched ? (
                  <p>
                    You rated with movie {watchedUserRating} <span>⭐️</span>
                  </p>
                ) : (
                  <>
                    <Ratings
                      userRating={userRating}
                      setUserRating={setUserRating}
                    />
                    {userRating != null && (
                      <button className="btn-add" onClick={onSubmit}>
                        + Add to list
                      </button>
                    )}
                  </>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        </div>
      )}
    </>
  );
}
