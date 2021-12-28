import React, { useState } from "react";
import styled from "./character.module.scss";

const Character = ({ character, charactersApi }) => {
  const { name } = character.result.properties;

  return (
    <div className={styled.container}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kz8OZm6SbGYsOm3gNx6sqi2dPA2FUHZWnxmVnVXqX-3IIJXJAdsFYvq3btLr4hs3gHs&usqp=CAU"
        className={styled.charimg}
      />

      <div className={styled.infocontainer}>
        <div className={styled.charinfo}>
          <span className={styled.title}>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default Character;

export const getServerSideProps = async (context) => {
  return {
    props: {
      data: "heelo",
    },
  };
};
