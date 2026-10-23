import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/fes-logo.png";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

export default function Nav({ setMovies, setLoading, setError }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    navigate("/");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch {
      setMovies([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="nav">
      <div className="logo">
        <img className="logo__img" src={logo} alt="Logo" />
        <h1 className="logo__title">
          Movie<span>Search</span>
        </h1>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-form__group">
          <input
            className="search-form__input"
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-form__button" type="submit" aria-label="Search">
            <svg
              className="search-form__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </button>
        </div>
      </form>
    </nav>
  );
}