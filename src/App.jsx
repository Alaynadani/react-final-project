import { Routes, Route } from 'react-router-dom'
import Layout from "./Layout"
import Home from "./Home"
import MovieDetails from "./MovieDetails"



export default function App () {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="movie/:imdbID" element={<MovieDetails />} />
      </Route>
    </Routes>
  )
}
