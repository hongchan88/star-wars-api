import React from "react";
import { useRouter } from "next/router";
import Characters from "../../components/characters";
import Link from "next/link";
import Header from "../../components/header";

const FilmsbyId = ({ dataFilmsById, characterData }) => {
  console.log(characterData);
  const { title, directed, producer, characters } =
    dataFilmsById.result.properties;
  const router = useRouter();

  return (
    <>
      <Header />
      <div>
        <h1>{title}</h1>
      </div>

      {characterData.map((character) => {
        return <Characters character={character} />;
      })}
      <Link href="/">Back Home</Link>
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
    characters.slice(0, 3).map(async (characterUrl) => {
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
