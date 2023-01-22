// import {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import MovieInfoComponent from "./components/MovieInfoComponent";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-movie-app" element={<Main/>} />
        <Route path="info/:id"  element={<MovieInfoComponent/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
