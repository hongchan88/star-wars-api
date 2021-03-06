import React, { useEffect, useState } from "react";
import styled from "./films.module.scss";
import Character from "../../components/character";
import Head from "next/head";
import Header from "../../components/header";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import Footer from "../../components/footer";

const boxVariants = {
  normal: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    y: 120,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};
const FilmsbyId = ({ dataFilmsById, characterData, loading }) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);

  const [innerWidth, setInnerWidth] = useState();
  const [characterQuery, setCharacterQuery] = useState(null);

  const router = useRouter();
  const { scrollY } = useViewportScroll();
  const {
    title,
    producer,
    director,
    release_date,
    opening_crawl,
    characters: charactersApi,
  } = dataFilmsById.result.properties;

  const offset = 6;
  // const divStyle = {
  //   height: "100vh",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   position: "relative",
  //   backgroundImage:
  //     'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url("https://res.cloudinary.com/dwbsxpk82/image/upload/v1640179209/portfolio/kki2so836ji1ptws2epr.jpg")',
  //   backgroundSize: "cover",
  // };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const incraseIndex = () => {
    if (!innerWidth) {
      alert("getting user's window size");
      return;
    }
    setDirection(true);
    if (characterData) {
      if (leaving) return;
      const totalMovies = characterData.length;
      const maxIndex = Math.floor(totalMovies / offset);
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const decreaseIndex = () => {
    setDirection(false);
    if (!innerWidth) {
      alert("getting user's window size");
      return;
    }
    if (characterData) {
      if (leaving) return;
      const totalMovies = characterData.length;

      const maxIndex = Math.floor(totalMovies / offset);
      toggleLeaving();

      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const onMoreInfoClicked = (character) => {
    const characterId = character.result.uid;
    router.push(
      {
        pathname: `/films/${dataFilmsById.result.uid}`,
        query: { characterId: characterId },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    setCharacterQuery(router.query.characterId);
  }, [router.query.characterId]);

  const clickOverlay = () => {
    router.push(
      {
        pathname: `/films/${dataFilmsById.result.uid}`,
      },
      undefined,
      { shallow: true }
    );
  };
  const clickedCharacter =
    characterQuery &&
    characterData.find((character) => character.result.uid === characterQuery);

  const pushBack = () => {
    router.push("/movies");
  };

  return (
    <>
      <Head>
        <title>Star Wars movie search</title>
        <meta name="description" content="Star Wars movie search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && <Loading />}
      <div
        className={styled.banner}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url("https://res.cloudinary.com/dwbsxpk82/image/upload/v1640179209/portfolio/kki2so836ji1ptws2epr.jpg")',
        }}
      >
        <Header />
        <div className={styled.movieinfo}>
          <p className={styled.title}>{title}</p>
          <p>Produced by {producer}</p>
          <p>Directed by {director}</p>
          <p>Released date: {release_date}</p>
          <p>{opening_crawl}</p>
        </div>
        <div className={styled.title}>
          <h1>Characters from {title}</h1>
        </div>

        <AnimatePresence>
          <>
            {characterQuery ? (
              <>
                <motion.div onClick={clickOverlay} className={styled.overlay} />
                <motion.div
                  layoutId={router.query.characterId}
                  className={styled.charinfobox}
                  style={{
                    top: scrollY.get() + 100,
                  }}
                >
                  <div
                    className={styled.charimg}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kz8OZm6SbGYsOm3gNx6sqi2dPA2FUHZWnxmVnVXqX-3IIJXJAdsFYvq3btLr4hs3gHs&usqp=CAU 
                        )`,
                    }}
                  />
                  {clickedCharacter && (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className={styled.exit}
                        onClick={clickOverlay}
                      >
                        <MdOutlineCancel />
                      </motion.div>

                      <div className={styled.charinfo}>
                        <p>Name: {clickedCharacter.result.properties.name} </p>
                        <p>
                          Height: {clickedCharacter.result.properties.height}{" "}
                        </p>
                        <p>
                          Birth Year:{" "}
                          {clickedCharacter.result.properties.birth_year}
                        </p>

                        <p>
                          Eye color:{" "}
                          {clickedCharacter.result.properties.eye_color}
                        </p>
                        <p>
                          Gender: {clickedCharacter.result.properties.gender}
                        </p>
                        <p>
                          Hair color:{" "}
                          {clickedCharacter.result.properties.hair_color}
                        </p>

                        <p>Mass: {clickedCharacter.result.properties.mass}</p>

                        <p>
                          Skin color:{" "}
                          {clickedCharacter.result.properties.skin_color}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </>
            ) : null}
          </>
        </AnimatePresence>

        <div className={styled.slider}>
          <div className={styled.gridcontainer}>
            <div className={styled.back} onClick={decreaseIndex}>
              <motion.p
                whileHover={{ scale: 1.3 }}
                className={styled.insidegrid}
              >
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
                {characterData
                  ?.slice(offset * index, offset * index + offset)
                  .map((character) => (
                    <motion.div
                      layoutId={character.result.uid}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      className={styled.box}
                      transition={{ type: "tween" }}
                      key={character.result.uid}
                      // onClick={() => router.push(`/films/${movie.uid}`)}
                    >
                      <Character
                        character={character}
                        charactersApi={charactersApi}
                      />

                      <motion.div
                        variants={infoVariants}
                        className={styled.infobox}
                      >
                        <h4 onClick={() => onMoreInfoClicked(character)}>
                          More info
                        </h4>
                      </motion.div>
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
        <div className={styled.backhome}>
          <p
            onClick={pushBack}
            style={{
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BiArrowBack /> Back to movies page
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FilmsbyId;
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://www.swapi.tech/api/films");
  const films = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = films.result.map((film) => ({
    params: { id: film.uid },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const resFilmsById = await fetch(
    `https://www.swapi.tech/api/films/${params.id}`
  );
  const dataFilmsById = await resFilmsById.json();

  const { characters } = dataFilmsById?.result?.properties;

  const getCharData = async (characterUrl) => {
    const res = await fetch(`${characterUrl}`);
    const data = await res.json();
    return data;
  };

  // Promise.all for using map function
  // get only 8 character api data as api server fails to get all data
  const characterData = await Promise.all(
    characters.slice(0, 7).map(async (characterUrl) => {
      const data = await getCharData(characterUrl);

      return data;
    })
  );

  if (!dataFilmsById || !characterData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dataFilmsById, characterData }, // will be passed to the page component as props
  };
}
