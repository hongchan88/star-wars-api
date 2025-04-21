import React, { useEffect, useState } from "react";
import styled from "./header.module.scss";
import Link from "next/link";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const Header = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const inputAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const [scrolly, setScrolly] = useState();
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
  const onSubmit = (data) => {
    router.push(
      {
        pathname: `/search`,
        query: { keyword: data.headerSearch },
      },
      undefined,
      { shallow: true }
    );
  };
  useEffect(() => {
    scrollY.onChange(() => {
      setScrolly(scrollY.get());
    });
  }, [scrollY]);

  return (
    <motion.nav
      animate={{
        backgroundColor:
          scrolly > 20 ? "rgba(0 , 0, 0, 1)" : "rgba(0 , 0, 0, 0.2)",
      }}
      className={styled.nav}
    >
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

          <Link href={{ pathname: "/movies" }}>
            <li className={styled.item}>
              Movies{" "}
              {router.pathname === "/movies" && (
                <motion.span className={styled.circle} layoutId="circle" />
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div className={styled.col}>
        <form className={styled.search} onSubmit={handleSubmit(onSubmit)}>
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
            {...register("headerSearch")}
            className={styled.input}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie"
          />
        </form>
      </div>
    </motion.nav>
  );
};

export default Header;
