import React from "react";
import { useRouter } from "next/router";
import Characters from "../../components/characters";
const FilmsbyId = ({ data, characterData }) => {
  console.log(characterData);
  const { title, directed, producer, characters } = data.result.properties;
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>{title}</h1>

      {characters.map((character) => {
        return <Characters character={character} />;
      })}
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
  const res = await fetch(`https://www.swapi.tech/api/films/${params.id}`);
  const data = await res.json();

  const { characters } = data.result.properties;
  const characterData = characters.map(async (characterUrl) => {
    const res = await fetch(`${characterUrl}`);
    const data = await res.json();
    return characterData;
  });

  console.log(characterData);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
