import Head from "next/head";
import { useEffect, useState } from "react";
import Movie from "../../components/movie.js";
import styled from "./search.module.scss";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "../../components/header.js";
import Loading from "../../components/loading.js";
import Footer from "../../components/footer.js";

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
      type: "tween",
    },
  },
};

export default function Search({ data, loading, clickFavourite, favourite }) {
  const { result } = data;
  const router = useRouter();

  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    const getSearchData = result.filter((movie) => {
      return movie.properties.title
        .toLowerCase()
        .includes(router.query.keyword.toLowerCase());
    });
    setFilteredData(getSearchData);
  }, [router.query.keyword]);

  return (
    <div>
      <Head>
        <title>Star Wars movie search</title>
        <meta name="description" content="Star Wars movie search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && <Loading />}
      <div className={styled.banner}>
        <Header />

        <div className={styled.slider}>
          <div className={styled.gridcontainer}>
            {filteredData?.length > 0 ? (
              filteredData?.map((movie) => (
                <motion.div
                  variants={boxVariants}
                  initial="normal"
                  whileHover={"hover"}
                  className={styled.box}
                  transition={{ type: "tween" }}
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

export async function getServerSideProps(context) {
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
