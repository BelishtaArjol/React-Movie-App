// import {useState} from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import MovieInfoComponent from "./components/MovieInfoComponent";
import Axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://imdb-api.com/API/AdvancedSearch/k_i03je5e9?groups=top_250&count=250`
    )
      .then((response) => {
        // console.log(response.data.results);
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/react-movie-app"
          element={<Main movies={movies} isLoading={isLoading} />}
        />
        <Route
          path="info/:id"
          element={<MovieInfoComponent movies={movies} isLoading={isLoading} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
