import React from "react";
import styled from "./footer.module.scss";

const Footer = (props) => {
  return (
    <footer className={styled.footer}>
      <p>Website developed by Hong Seo</p>
      <div className={styled.github}>
        <a href="https://github.com/hongchan88/star-wars-api" target={"_blank"}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
        </a>
      </div>
      <div className={styled.linkedin}>
        <a href="https://www.linkedin.com/in/hong-seo/" target={"_blank"}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
