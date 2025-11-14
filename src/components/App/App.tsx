import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query.trim() !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request");
    }
  }, [data]);

  const handleSearch = async (query: string) => {
    setQuery(query);
    setPage(1); // сбрасываем страницу при новом поиске
  };

  const totalPages = data?.total_pages ?? 0;

  const handleClick = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };
  return (
    <div className={css.app}>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleClick} movies={data.results} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
