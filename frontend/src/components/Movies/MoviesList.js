import React, { useState, useEffect, Fragment } from "react";
import Header from "../Header/Header";
import Card from "../Card/Card";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [smovies, searchMovies] = useState([]);
  const [query, setQuery] = useState("");

  const getMovieList = async () => {
    const apiURI = `http://localhost:3001/movies`;

    try {
      const response = await fetch(apiURI);
      const responseJson = await response.json();
      setMovies(responseJson);
    } catch (err) {
      console.error(err);
    }
  };

  const searchMovie = async (e) => {
    e.preventDefault();

    const apiURI = `http://localhost:3001/search?name=${query}`;
    console.log(apiURI);

    try {
      const response = await fetch(apiURI);
      const responseJson = await response.json();
      searchMovies(responseJson);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  console.log(movies, "movies");

  return (
    <Fragment>
      <div className="shoppies">
        {/*Header component*/}
        <Header
          searchMovie={searchMovie}
          query={query}
          setQuery={setQuery}
          smovies={smovies}
        />
      </div>
      <div className="list-movie">
        <Card movies={movies} />
      </div>
    </Fragment>
  );
};

export default Movies;
