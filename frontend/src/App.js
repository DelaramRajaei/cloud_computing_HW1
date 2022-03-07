import React, {useState,useEffect,Fragment} from 'react';
import Header from './components/Header/Header';
import Movies from './components/Movies/MoviesList';

import './App.css';


function App() {
  const [allMovies, setAllMovies] = useState(null);
  const [movies, setMovies] = useState(null);
  const [smovies, searchMovies] = useState([]);
  const [query, setQuery] = useState("");

  const getMovieList = async () => {
    const apiURI = `http://localhost:3001/movies`;

    try {
      await fetch(apiURI).then((response) =>
        response.json()
      ).then(movies=>{
        setMovies(movies);
        setAllMovies(movies);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const searchMovie = async (movieName) => {
    if(movieName===''){
      setMovies(allMovies);
    }else{
    setMovies((movies?? []).filter(movie=>movie.name.toLowerCase().includes(movieName.toLowerCase())));}
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="App">
      <Fragment>
      <div className="shoppies">
        {/*Header component*/}
        <Header
          onSearchMovie={searchMovie}
        />
      </div>
      <div className="list-movie">
        <Movies movies={movies} />
      </div>
    </Fragment>
    </div>
  );
}

export default App;