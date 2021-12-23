import React, { useState } from "react";
import styled from "./header.module.scss";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  return (
    <nav className={styled.nav}>
      <div className={styled.col}>
        <svg className={styled.logo}></svg>
        <ul className={styled.items}>
          <Link href="/">
            <li className={styled.item}>
              Home
              {router.pathname === "/" && (
                <motion.span className={styled.circle} layoutId="circle" />
              )}
            </li>
          </Link>

          <Link href="/movies">
            <li className={styled.item}>
              Movies{" "}
              {router.pathname === "/movies" && (
                <motion.span className={styled.circle} layoutId="circle" />
              )}
            </li>
          </Link>
          <Link href="/myfav">
            <li className={styled.item}>
              My Favourite
              {router.pathname === "/myfav" ? (
                <motion.span className={styled.circle} layoutId="circle" />
              ) : null}
            </li>
          </Link>
        </ul>
      </div>
      <div className={styled.col}>
        <form className={styled.search}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <motion.input
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </form>
      </div>
    </nav>
  );
};

export default Header;
