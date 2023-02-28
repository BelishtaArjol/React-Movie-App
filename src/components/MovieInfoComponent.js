// import React, { useEffect, useState } from "react";
// import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;

const MovieInfoComponent = ({ movies, isLoading }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentMovie = movies?.find((movie) => movie.id === id);

  return (
    <div>
      {isLoading ? (
        <h1
          style={{
            position: "absolute",
          }}
        >
          Loading Movie Details ...
        </h1>
      ) : (
        <Container>
          {currentMovie && (
            <>
              <CoverImage src={currentMovie?.image} alt={currentMovie?.title} />
              <InfoColumn>
                <MovieName>
                  <span>{currentMovie?.title}</span>
                </MovieName>
                <MovieInfo>
                  IMDB Rating: <span>{currentMovie?.imDbRating}</span>
                </MovieInfo>
                <MovieInfo>
                  IMDB Rating Votes:{" "}
                  <span>{currentMovie?.imDbRatingVotes}</span>
                </MovieInfo>
                <MovieInfo>
                  Year: <span>{currentMovie?.description}</span>
                </MovieInfo>
                <MovieInfo>
                  Genre: <span>{currentMovie?.genres}</span>
                </MovieInfo>
                <MovieInfo>
                  Main Actors: <span>{currentMovie?.stars}</span>
                </MovieInfo>
                <MovieInfo>
                  Plot: <span>{currentMovie?.plot}</span>
                </MovieInfo>
                <MovieInfo>
                  <button
                    className="btn btn-link"
                    onClick={() => {
                      navigate("/react-movie-app");
                    }}
                  >
                    Return to Homepage
                  </button>
                </MovieInfo>
              </InfoColumn>
            </>
          )}
        </Container>
      )}
    </div>
  );
};
export default MovieInfoComponent;
