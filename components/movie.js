import React from "react";
import Link from "next/link";
const Movie = ({ movie, clickFavourite }) => {
  const { title, url, created, directed, uid } = movie.properties;
  console.log("movie");

  const favourite = () => {
    clickFavourite(movie.uid);
  };
  return (
    <>
      <Link href={`/films/${movie.uid}`}>
        <h1>{title}</h1>
      </Link>

      <p>{directed}</p>

      <div onClick={favourite}> click</div>
    </>
  );
};

export default Movie;
