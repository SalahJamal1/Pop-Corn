const apiUrl = "https://www.omdbapi.com/?apikey=";
const key = "53f9eba3";

export async function apiMovies(
  query: string,
  abortController: AbortController
) {
  const res = await fetch(`${apiUrl}${key}&s=${query}`, {
    signal: abortController.signal,
  });
  const data = await res.json();
  return data;
}
export async function apiMovie(
  select: string,
  abortController: AbortController
) {
  const res = await fetch(`${apiUrl}${key}&i=${select}`, {
    signal: abortController.signal,
  });
  const data = await res.json();
  return data;
}
