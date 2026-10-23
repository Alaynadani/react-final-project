import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_OMDB_KEY

function DetailsSkeleton() {
  return (
    <div className="movie-details__content">
      <div className="movie-details__poster--wrapper">
        <div className="movie-details__poster--skeleton"></div>
      </div>
      <div className="movie-details__info--skeleton">
        <div className="movie-details__title-skeleton"></div>
        <div className="movie-details__info-line--skeleton"></div>
        <div className="movie-details__info-line--skeleton"></div>
        <div className="movie-details__info-line--skeleton"></div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="movie-details__detail--skeleton">
            <div className="movie-details__detail-title--skeleton"></div>
            <div className="movie-details__detail-text--skeleton"></div>
            <div className="movie-details__detail-text--skeleton"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MovieDetails() {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadMovie() {
      setLoading(true)
      setError('')

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
        )
        const data = await res.json()

        if (ignore) return

        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError(data.Error)
        }
      } catch {
        if (!ignore) setError('Something went wrong. Please try again.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadMovie()

    return () => {
      ignore = true
    }
  }, [imdbID])

  const hasPoster = movie && movie.Poster && movie.Poster !== 'N/A'

  const details = movie
    ? [
        { label: 'Plot', value: movie.Plot },
        { label: 'Genre', value: movie.Genre },
        { label: 'Director', value: movie.Director },
        { label: 'Actors', value: movie.Awards },
      ].filter((d) => d.value && d.value !== 'N/A')
    : []

  return (
    <div className="movie-details__container">
      <div className="movie-details__back">
        <Link to="/" className="movie-details__back-link">
          &larr; Back to Movies
        </Link>
      </div>

      {loading && <DetailsSkeleton />}

      {!loading && error && <p>{error}</p>}

      {!loading && movie && (
        <div className="movie-details__content">
          <div className="movie-details__poster--wrapper">
            {hasPoster ? (
              <img
                className="movie-details__poster"
                src={movie.Poster}
                alt={movie.Title}
              />
            ) : (
              <div className="movie-details__poster--placeholder">
                <h2 className="movie-details__title">{movie.Title}</h2>
                <p className="movie-details__year">Year: {movie.Year}</p>
                <p className="movie-details__rating">IMDb Rating: {movie.imdbRating}</p>
                <p className="movie-details__released">Released: {movie.Released}</p>
              </div>
            )}
          </div>

          <div className="movie-details__info">
            <h2 className="movie-details__title">{movie.Title}</h2>
            <p className="movie-details__year">Year: {movie.Year}</p>
            <p className="movie-details__rating">IMDb Rating: {movie.imdbRating}</p>
            <p className="movie-details__released">Released: {movie.Released}</p>

            <div className="movie-details__text--wrapper">
              {details.map((d) => (
                <div key={d.label} className="movie-details__detail">
                  <h3>{d.label}</h3>
                  <p>{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}