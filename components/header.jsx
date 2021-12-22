import React from "react";
import styled from "./header.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();

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
    </nav>
  );
};

export default Header;
