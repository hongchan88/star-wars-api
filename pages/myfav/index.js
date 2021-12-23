import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import styled from "./myfav.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const rowVariants = {
  hidden: {
    x: 584 + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -584 - 10,
  },
};
const MyFav = (props) => {
  const [index, setIndex] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incraseIndex = () => {
    setIndex((prev) => prev + 1);
  };
  const array = [1, 2, 3, 4, 5, 6];
  console.log(6 % index);
  const arraySliced = data.slice(index - 1, index + 2);
  console.log(arraySliced);
  useEffect(() => {
    if (index < 6 ? index % 4 === 0 : index % 6 === 0) {
      setData((prev) => {
        return [...prev, ...array];
      });
    }
  }, [index]);
  return (
    <>
      <h1 onClick={incraseIndex}>my favourite</h1>
      <div className="main">
        <div className={styled.slider}>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <motion.div
              className={styled.row}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={index}
            >
              {arraySliced.map((i) => (
                <motion.div className={styled.box} key={i}>
                  {i}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default MyFav;
