import React, { useEffect, useState } from "react";
import styled from "./films.module.scss";
import Character from "../../components/character";
import Link from "next/link";
import Header from "../../components/header";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

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

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const FilmsbyId = ({ dataFilmsById, characterData }) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);

  const [innerWidth, setInnerWidth] = useState();
  const [characterQuery, setCharacterQuery] = useState(null);

  const router = useRouter();
  const { scrollY } = useViewportScroll();
  const {
    title,
    directed,
    producer,
    characters: charactersApi,
  } = dataFilmsById.result.properties;
  console.log(charactersApi?.length, "api");
  const offset = 6;
  const divStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url("https://res.cloudinary.com/dwbsxpk82/image/upload/v1640179209/portfolio/kki2so836ji1ptws2epr.jpg")',
    backgroundSize: "cover",
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
    if (characterData) {
      console.log(leaving);
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
      console.log(leaving);
      if (leaving) return;
      const totalMovies = characterData.length;
      console.log(totalMovies);
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

  return (
    <>
      <Header />
      <div style={divStyle}>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          <AnimatePresence>
            <>
              {characterQuery ? (
                <>
                  <motion.div
                    onClick={clickOverlay}
                    className={styled.overlay}
                  />
                  <motion.div
                    layoutId={router.query.characterId + ""}
                    style={{
                      position: "absolute",

                      width: "40vw",
                      height: "80vh",
                      background: "red",
                      top: scrollY.get() + 100,
                      left: "0",
                      right: "0",
                      margin: "0 auto",
                      zIndex: "1",
                    }}
                  ></motion.div>
                </>
              ) : null}
            </>
          </AnimatePresence>
        </div>
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
                      layoutId={character.result.uid + ""}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      className={styled.box}
                      transition={{ type: "tween" }}
                      key={character.result.uid}
                      // onClick={() => router.push(`/films/${movie.uid}`)}
                    >
                      {
                        <Character
                          character={character}
                          charactersApi={charactersApi}
                        />
                      }
                      <motion.div
                        variants={infoVariants}
                        className={styled.infobox}
                      >
                        <h4 onClick={() => onMoreInfoClicked(character)}>
                          more info
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
        <Link href="/">Back Home</Link>
      </div>
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
  console.log(params);
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
  const characterData = await Promise.all(
    characters.slice(0, 8).map(async (characterUrl) => {
      const data = await getCharData(characterUrl);

      return data;
    })
  );

  //get only one chracter data
  // const cData = await getCharData(characters[0]).then((data) => {
  //   console.log(data, "sdfs");
  //   return data;
  // });

  if (!dataFilmsById || !characterData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dataFilmsById, characterData }, // will be passed to the page component as props
  };
}
