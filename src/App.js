import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };
  const handlerOnSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length > 0) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else {
      getMovies(API_URL);
    }
  };
  const handlerOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  return (
    <React.Fragment>
      <header>
        <form onSubmit={handlerOnSubmit}>
          <input
            type="search"
            className="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handlerOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </React.Fragment>
  );
};

export default App;
