import { useState } from "react"
import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
    const [imgFailed, setImgFailed] = useState(false)
    const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgFailed

    return (
        <Link to={`/movie/${movie.imdbID}`} className="movie-card">
            {hasPoster ? (
                <img
                    className="movie-card__img"
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={() => setImgFailed(true)}
                />
            ) : (
                <div className="movie-card__poster-placeholder">No poster available</div>
            )}
            <h3 className="movie-card__title">{movie.Title}</h3>
            <p className="movie-card__year">{movie.Year}</p>
        </Link>
    )
}