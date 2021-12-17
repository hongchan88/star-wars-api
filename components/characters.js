import React from "react";

const Characters = ({ character }) => {
  console.log(data);
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default Characters;

export async function getStaticProps({ character }) {
  console.log(character);
  const res = await fetch(`https://www.swapi.tech/api/people/1`);
  const data = await res.json();
  console.log(data);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
