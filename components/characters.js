import React, { useState } from "react";

const Characters = ({ character }) => {
  const [isHover, setHover] = useState(false);
  const handleMouseIn = () => {
    setHover(true);
  };
  const handleMouseOut = () => {
    setHover(false);
  };
  const tooltipStyle = {
    display: isHover ? "block" : "none",
  };
  return (
    <div>
      <div onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
        {character?.result.properties.name}
      </div>
      <div style={tooltipStyle}>This is tooltip</div>
    </div>
  );
};

export default Characters;

// export async function getStaticProps({ character }) {
//   console.log(character);
//   const res = await fetch(`https://www.swapi.tech/api/people/1`);
//   const data = await res.json();
//   console.log(data);
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
