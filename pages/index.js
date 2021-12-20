import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Movie from "../components/movie.js";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Home({ data }) {
  const { result } = data;
  const [favourite, setFavourite] = useState({});
  const { register, handleSubmit, watch } = useForm();
  const [filteredData, setFilteredData] = useState();
  const onSubmit = (data) => {
    console.log(data.search);
    const filteredData = result.filter((movie) => {
      return movie.properties.title
        .toLowerCase()
        .includes(data.search.toLowerCase());
    });
    setFilteredData(filteredData);
  };
  useEffect(() => {
    const filteredData = result.filter((movie) => {
      return movie.properties.title
        .toLowerCase()
        .includes(watch("search").toLowerCase());
    });
    setFilteredData(filteredData);
  }, [watch("search")]);

  const clickFavourite = (movieId) => {
    if (
      favourite[movieId] == undefined ||
      favourite[movieId].favourite == false
    ) {
      console.log("hi", movieId);

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <p>Favourite movies</p>
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
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
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
