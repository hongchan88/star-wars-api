import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Movie from "../../components/movie.js";

import styled from "./movies.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "../../components/header.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duaration: 0.3,
      type: "tween",
    },
  },
};

export default function Movies({ data }) {
  const { result } = data;
  const [favourite, setFavourite] = useState({});
  const { register, handleSubmit, watch } = useForm();
  const [filteredData, setFilteredData] = useState();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);

  const [innerWidth, setInnerWidth] = useState();
  const router = useRouter();
  const offset = 3;

  const moveToFilmPage = (movie, router) => {
    router.push(`/films/${movie.uid}`);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);
  console.log(innerWidth);
  const incraseIndex = () => {
    if (!innerWidth) {
      alert("getting user's window size");
      return;
    }
    setDirection(true);
    if (result) {
      console.log(leaving);
      if (leaving) return;
      toggleLeaving();
      setIndex((prev) => (prev === 1 ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const decreaseIndex = () => {
    setDirection(false);
    if (!innerWidth) {
      alert("getting user's window size");
      return;
    }
    if (result) {
      console.log(leaving);
      if (leaving) return;
      toggleLeaving();

      setIndex((prev) => (prev === 1 ? 0 : prev + 1));
    }
  };

  const onSubmit = (data) => {
    console.log(data.search);
    const filteredData = result.filter((movie) => {
      return movie.properties.title
        .toLowerCase()
        .includes(data.search.toLowerCase());
    });
    setFilteredData(filteredData);
  };
  // useEffect(() => {
  //   const filteredData = result.filter((movie) => {
  //     return movie.properties.title
  //       .toLowerCase()
  //       .includes(watch("search").toLowerCase());
  //   });
  //   setFilteredData(filteredData);
  // }, [watch("search")]);

  const clickFavourite = (movieId) => {
    if (
      favourite[movieId] == undefined ||
      favourite[movieId].favourite == false
    ) {
      setFavourite((prev) => {
        const updatedFav = { ...prev, [movieId]: { favourite: true } };
        return updatedFav;
      });
    } else if (favourite[movieId]?.favourite == true) {
      setFavourite((prev) => {
        const updatedFav = { ...prev, [movieId]: { favourite: false } };
        return updatedFav;
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div onClick={incraseIndex} className={styled.banner}></div>
      <main className={styled.container}>
        <Header />
        {/* <h1 className={styled.title} onClick={incraseIndex}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1> */}

        <div className={styled.slider}>
          <div className={styled.gridcontainer}>
            <div className={styled.back} onClick={decreaseIndex}>
              <motion.p
                whileHover={{ scale: 1.3 }}
                className={styled.insidegrid}
              >
                {" "}
                <FaArrowLeft size={50} />
              </motion.p>
            </div>
            <AnimatePresence
              initial={false}
              custom={direction}
              onExitComplete={toggleLeaving}
            >
              <motion.div
                className={styled.row}
                custom={direction}
                initial={(direction) => {
                  return {
                    x: direction ? innerWidth + 5 : -innerWidth - 5,
                    opacity: 0.2,
                  };
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={(direction) => {
                  return {
                    x: direction ? -innerWidth - 5 : innerWidth + 5,
                    opacity: 0.2,
                  };
                }}
                transition={{
                  type: "tween",
                  duration: 1,
                }}
                key={index}
              >
                {result
                  ?.slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <motion.div
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      className={styled.box}
                      transition={{ type: "tween" }}
                      key={movie.uid}
                      // onClick={() => router.push(`/films/${movie.uid}`)}
                      onClick={() => moveToFilmPage(movie, router)}
                    >
                      <Movie
                        movie={movie}
                        key={movie.uid}
                        clickFavourite={clickFavourite}
                        favourite={favourite[movie.uid]?.favourite}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
            <div className={styled.next} onClick={incraseIndex}>
              <motion.p
                whileHover={{ scale: 1.3 }}
                className={styled.insidegrid}
              >
                <FaArrowRight size={50} />
              </motion.p>
            </div>
          </div>
        </div>
        {/* <div className={styled.direction}>
            <div className={styled.next}>Next</div>
            <div className={styled.next}>before</div>
          </div>
        </div> */}
        {/* <p>Favourite movies</p>
        <div className={styles.grid}>
          {result.map((movie) => {
            if (favourite[movie.uid]?.favourite == true) {
              return (
                <a className={styles.card}>
                  <Movie
                    movie={movie}
                    key={movie.uid}
                    clickFavourite={clickFavourite}
                  />
                </a>
              );
            }
          })}
        </div>
        <p>All movies</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("search", {
              required: "Please enter search term",
            })} // custom message
          />
          <input type="submit" />
        </form>
        <div className={styles.grid}>
          {filteredData
            ? filteredData.map((movie) => {
                return (
                  <Link href={`/films/${movie.uid}`}>
                    <a className={styles.card}>
                      <Movie
                        movie={movie}
                        key={movie.uid}
                        clickFavourite={clickFavourite}
                      />
                    </a>
                  </Link>
                );
              })
            : result.map((movie) => {
                return (
                  <Link href={`/films/${movie.uid}`}>
                    <a className={styles.card}>
                      <Movie
                        movie={movie}
                        key={movie.uid}
                        clickFavourite={clickFavourite}
                      />
                    </a>
                  </Link>
                );
              })}
        </div> */}
      </main>

      <footer className={styled.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`https://www.swapi.tech/api/films`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
