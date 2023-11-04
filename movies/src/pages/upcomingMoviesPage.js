import React from "react";
import { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlayListAddIcon from '@mui/icons-material/PlaylistAdd';

const UpcomingMoviesPage = (props) => {

  const [movies, setMovies] = useState([]);
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

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
