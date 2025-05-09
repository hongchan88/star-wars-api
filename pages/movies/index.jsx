import Head from 'next/head';

import { useEffect, useState } from 'react';
import Movie from '../../components/movie.jsx';

import styled from './movies.module.scss';

import { useForm } from 'react-hook-form';
import Header from '../../components/header.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Loading from '../../components/loading.jsx';
import Footer from '../../components/footer.jsx';

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.1,
      duration: 0.2,
      type: 'tween',
    },
  },
};

export default function Movies({ data, loading, clickFavourite, favourite }) {
  const { result } = data;

  const { register, handleSubmit, watch } = useForm();
  const [filteredData, setFilteredData] = useState(null);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);
  const [innerWidth, setInnerWidth] = useState();
  const [movieData, setMovieData] = useState([]);

  const offset = 3;

  const filterFavMovieTop = () => {
    const favList = [];
    const NfavList = [];

    result.map((movie) => {
      const favMovie = Object.keys(favourite).filter(
        (key) => movie.uid === key
      );
      if (movie.uid === favMovie[0]) {
        favList.push(movie);
      } else {
        NfavList.push(movie);
      }
    });
    setMovieData([...favList, ...NfavList]);
  };

  useEffect(() => {
    filterFavMovieTop();
  }, [favourite]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incraseIndex = () => {
    setDirection(true);
    if (result) {
      if (filteredData?.length < 3) return;
      if (leaving) return;
      toggleLeaving();

      setIndex((prev) => (prev === 1 ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    setDirection(false);

    if (result) {
      if (filteredData?.length < 3) return;
      if (leaving) return;
      toggleLeaving();

      setIndex((prev) => (prev === 0 ? 1 : prev - 1));
    }
  };

  const onSubmit = (data) => {
    const filteredData = result.filter((movie) => {
      return movie.properties.title
        .toLowerCase()
        .includes(data.search.toLowerCase());
    });
    setFilteredData(filteredData);
  };
  useEffect(() => {
    if (watch('search') !== '') {
      setIndex(0);

      const filteredData = movieData.filter((movie) => {
        return movie.properties.title
          .toLowerCase()
          .includes(watch('search').toLowerCase());
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData(null);

      setIndex(0);

      setLeaving(false);
    }
  }, [watch('search')]);

  return (
    <div>
      <Head>
        <title>Star Wars movie search</title>
        <meta name='description' content='Star Wars movie search' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {!loading && <Loading />}
      <div className={styled.banner}>
        <Header />
        <div className={styled.col}>
          <form className={styled.search} onSubmit={handleSubmit(onSubmit)}>
            <svg
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
            <motion.input
              className={styled.input}
              placeholder='Search for movie ..'
              {...register('search', {
                required: 'Please enter search term',
              })}
            />
          </form>
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
                  type: 'tween',
                  duration: 1,
                }}
                key={index}
              >
                {filteredData
                  ? filteredData
                      ?.slice(offset * index, offset * index + offset)
                      .map((movie) => (
                        <motion.div
                          variants={boxVariants}
                          initial='normal'
                          className={styled.box}
                          transition={{ type: 'tween' }}
                          key={movie.uid}
                        >
                          <Movie
                            movie={movie}
                            key={movie.uid}
                            clickFavourite={clickFavourite}
                            favourite={favourite[movie.uid]?.favourite}
                          />
                        </motion.div>
                      ))
                  : movieData
                      ?.slice(offset * index, offset * index + offset)
                      .map((movie) => (
                        <motion.div
                          variants={boxVariants}
                          initial='normal'
                          className={styled.box}
                          transition={{ type: 'tween' }}
                          key={movie.uid}
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
      </div>
      <Footer />
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
