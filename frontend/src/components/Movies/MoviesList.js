import React from "react";
import "./Movies.css";
import Card from '../Card/Card'

const Movies = ({movies}) => {
  const cards = movies==null ? <span>No movies</span> : movies.map(movie=><Card key={movie.movieID} movie={movie} />);

  return (<>{cards}</>);
};

export default Movies;
