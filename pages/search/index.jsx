import Head from 'next/head';
import { useEffect, useState } from 'react';

import styled from './search.module.scss';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Movie from '../../components/movie.jsx';
import Header from '../../components/header.jsx';
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

export default function Search({ clickFavourite, favourite }) {
  const router = useRouter();

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://www.swapi.tech/api/films');
        const data = await res.json();
        const result = data.result || [];

        const keyword = router.query.keyword?.toLowerCase() || '';
        const filtered = result.filter((movie) =>
          movie?.properties?.title?.toLowerCase().includes(keyword)
        );

        setFilteredData(filtered);
      } catch (err) {
        console.error('Failed to fetch movies', err);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchMovies();
    }
  }, [router.query.keyword, router.isReady]);

  return (
    <div>
      <Head>
        <title>Star Wars movie search</title>
        <meta name='description' content='Star Wars movie search' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styled.banner}>
        <Header />

        <div className={styled.slider}>
          <div className={styled.gridcontainer}>
            {loading ? (
              <div className={styled.loading}>
                <Loading />
              </div>
            ) : filteredData?.length > 0 ? (
              filteredData.map((movie) => (
                <motion.div
                  variants={boxVariants}
                  initial='normal'
                  whileHover='hover'
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
            ) : (
              <div className={styled.noresult}>
                <h1>No result found</h1>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
