import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./MovieComponent";
import Pagination from "./Pagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const Filter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: relative;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [searchParam] = useState(["title"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [searchQuery, updateSearchQuery] = useState("");

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

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const search = (currentMovies) => {
    return currentMovies.filter((item) => {
      if (item.genres.indexOf(filterParam) !== -1) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) > -1
          );
        });
      }
    });
  };

  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/movie-icon.svg" />
          React Movie App
        </AppName>
        <Filter>
          <select
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Movies by genre"
          >
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
          </select>
          <span></span>
        </Filter>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
        </SearchBox>
      </Header>
      <div style={{ position: "relative" }}>
        {isLoading ? (
          <h1
            style={{
              position: "absolute",
            }}
          >
            Loading Movies ...
          </h1>
        ) : (
          <MovieListContainer>
            {search(currentMovies).map((movie, index) => (
              <MovieComponent key={index} movie={movie} />
            ))}
          </MovieListContainer>
        )}
      </div>

      <Pagination
        moviesPerPage={moviesPerPage}
        allMovies={movies.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default Main;
