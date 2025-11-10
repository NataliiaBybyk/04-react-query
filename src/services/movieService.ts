import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
  query: string;
}

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async ({
  query,
}: FetchMoviesParams): Promise<Movie[]> => {
  const { data } = await axios.get<FetchMoviesResponse>(BASE_URL, {
    params: { query },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data.results;
};
