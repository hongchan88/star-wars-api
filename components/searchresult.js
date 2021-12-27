import React from "react";
import Link from "next/link";
import styled from "./movie.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
const Searchresult = ({ movie, clickFavourite, favourite, moveToFilmPage }) => {
  console.log(favourite);
  const { title, url, created, director, release_date } = movie.properties;
  const movieImg = {
    1: {
      ImgUrl:
        "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640177546/portfolio/eiaj4uqsbmdjytxf7hko.jpg",
    },
    2: {
      ImgUrl:
        "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640178129/portfolio/mdbwhbozmdboht1wsmyg.jpg",
    },
    3: {
      ImgUrl:
        "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640178585/portfolio/ljlt53grbh15hjkdas59.jpg",
    },
    4: {
      ImgUrl:
        "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640178923/portfolio/icf7t7lceh3rmwv8yzi4.jpg",
    },
    5: {
      ImgUrl:
        "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640178921/portfolio/cj3kg2djvi0qstvzsxco.jpg",
    },
    6: {
      ImgUrl:
        "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640178854/portfolio/ddo1juuw3wbigublznkq.png",
    },
  };

  return (
    <div className={styled.container}>
      <Link href={`/films/${movie.uid}`}>
        <img src={movieImg[movie.uid]?.ImgUrl} className={styled.movieimg} />
      </Link>
      <div className={styled.infocontainer}>
        <div className={styled.movieinfo}>
          <span className={styled.title}>{title}</span>
          <span>{release_date.slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
};

export default Searchresult;
