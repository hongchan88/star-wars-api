import React from "react";

const Movie = ({ movie }) => {
  const { title, url, created, directed } = movie.properties;
  return (
    <>
      <h1>{title}</h1>

      <p>{directed}</p>
    </>
  );
};

export default Movie;
