import {useEffect, useState} from 'react'
import './App.css'
import api from './api/axiosConfig.jsx'
import Layout from './components/Layout'
import {Routes, Route} from "react-router-dom";
import Home from './components/home/Home'
import Header from "./components/header/Header.jsx";
import Trailer from "./components/trailer/Trailer.jsx";
import Reviews from "./components/review/Review.jsx";

function App() {
  const [movies, setMovies] = useState()
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState()

  const getMovies = async () => {
    try{
      const response = await api.get("/api/v1/movies");
      console.log(response)
      setMovies(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getMovie = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/id/${movieId}`)
      const singleMovie = response.data
      console.log(singleMovie)
      setMovie(singleMovie)
      setReviews(singleMovie.reviews)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    void getMovies();
  },[])

  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home movies={movies}/>} ></Route>
            <Route path="trailer/:ytTrailerId" element={<Trailer/>}/>
            <Route path="reviews/:movieId" element={<Reviews getMovieData={getMovie} movie={movie} setReviews={setReviews} reviews={reviews}/>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App
