import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function Layout () {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

  return (
    <div>
      <Nav setMovies={setMovies} setLoading={setLoading} setError={setError} />
        <main className="main">
            <Outlet context={{ movies, loading, error }} />
        </main>
        <footer className="footer">2026 Movie Search</footer>
      </div>
  )
}