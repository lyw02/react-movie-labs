import React from "react";
import { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlayListAddIcon from '@mui/icons-material/PlaylistAdd';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const UpcomingMoviesPage = (props) => {

  // const [movies, setMovies] = useState([]);
  // const favorites = movies.filter((m) => m.favorite);
  // localStorage.setItem("favorites", JSON.stringify(favorites));

  // useEffect(() => {
  //   getUpcomingMovies().then(movies => {
  //     setMovies(movies);
  //   });
  // }, []);

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate 
      title="Upcoming Movies" 
      movies={movies} 
      // selectFavorite={addToFavorites}
      action={(movie) => {
        return <PlayListAddIcon />
      }}
    />
  );
};

export default UpcomingMoviesPage;
