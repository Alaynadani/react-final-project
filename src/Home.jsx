import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "./MovieCard";

function SkeletonCard() {
  return (
    <div className="movie-card--skeleton">
      <div className="movie-card__img--skeleton"></div>
      <div className="movie-card__title--skeleton"></div>
      <div className="movie-card__year--skeleton"></div>
    </div>
  );
}

export default function Home() {
  const { movies, loading, error } = useOutletContext();
  const [sort, setSort] = useState("");

  const sortedMovies = [...movies];

  if (sort === "az") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sort === "za") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sort === "newest") {
    sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (sort === "oldest") {
    sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  return (
    <>
      <div className="controls">
        <span>{!loading && movies.length > 0 ? `${movies.length} results` : ""}</span>
        <label>
          Sort by:
          <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="newest">Year: Newest - Oldest</option>
            <option value="oldest">Year: Oldest - Newest</option>
          </select>
        </label>
      </div>

      {error && <p>{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p>Search for a movie to get started.</p>
      )}

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : sortedMovies.map((m) => <MovieCard key={m.imdbID} movie={m} />)}
      </div>
    </>
  );
}