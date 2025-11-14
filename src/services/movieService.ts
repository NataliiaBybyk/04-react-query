import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async ({
  query,
  page = 1,
}: FetchMoviesParams): Promise<FetchMoviesResponse> => {
  const { data } = await axios.get<FetchMoviesResponse>(BASE_URL, {
    params: { query, page },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};
