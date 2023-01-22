import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Watch } from "react-loader-spinner";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  const navigate = useNavigate();
  const { title, description, imDbRating, id, image } = props.movie;

  return (
    <MovieContainer
      onClick={() => {
        props.movie ? navigate(`/info/${id}`) : <Watch></Watch>;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={image} alt={title} />
      <MovieName>{title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {description}</MovieInfo>
        <MovieInfo>IMDB : {imDbRating}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
