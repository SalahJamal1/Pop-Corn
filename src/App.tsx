import Header from "./components/Header";
import Box from "./components/Box";
import MovieList from "./components/MoviesList";
import Summary from "./components/Summary";
import WatchedList from "./components/WatchedList";
import { useMovies } from "./hooks/useMovies";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const { select } = useMovies() ?? {};
  return (
    <>
      <Header />
      <main className="main">
        <Box>
          <MovieList />
        </Box>
        <Box>
          {select ? (
            <MovieDetails />
          ) : (
            <>
              <Summary />
              <WatchedList />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
