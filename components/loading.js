import React, { useEffect, useState } from "react";
import styled from "./loading.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const boxVariant = {
  start: {
    opacity: 0,
    scale: 0,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.5,
      delayChildren: 0.5,
      repeat: Infinity,

      repeatDelay: 2,
      staggerChildren: 0.5,
      repeatType: "loop",
    },
  },
};
const imgVariant = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,

      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 2,
    },
  },
};

const Loading = (props) => {
  const [randomNumber, setRandomNumber] = useState([1, 2, 3, 4]);
  const iconsArray = [
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640665378/portfolio/dtc9wkrhwjdq2d9s6ubx.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640665171/portfolio/nfwcfxw2mxki6kmcl76r.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640665171/portfolio/byogcafyfqrt16iqgwgz.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640665171/portfolio/zq6fhvcvnrhjgazczv9a.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640665171/portfolio/idsmz3d51l37csmjqpts.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640663286/portfolio/haeqxnwsf631fxjxkt97.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640662975/portfolio/sws9k15lbkk9hkxeaoy7.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640662352/portfolio/ubzevznfb2u4c0etnxkw.png",
    "https://res.cloudinary.com/dwbsxpk82/image/upload/v1640661982/portfolio/hm5uuztjqyfcp7lnv8bp.png",
  ];

  useEffect(() => {
    setInterval(() => {
      getRandomNumber();
    }, 5000);
  }, []);

  const getRandomNumber = () => {
    const min = 0;
    const max = 8;
    const stop = 4; //Number of numbers to extract

    let numbers = [];

    for (let i = 0; i < stop; i++) {
      const n = Math.floor(Math.random() * max) + min;
      const check = numbers.includes(n);

      if (check === false) {
        numbers.push(n);
      } else {
        while (check === true) {
          n = Math.floor(Math.random() * max) + min;
          check = numbers.includes(n);
          if (check === false) {
            numbers.push(n);
          }
        }
      }
    }

    setRandomNumber([...numbers]);
  };

  console.log(randomNumber);
  return (
    <>
      <div className={styled.loading_container}>
        <motion.div
          variants={boxVariant}
          initial="start"
          animate="end"
          exit="exit"
          className={styled.img_cont}
        >
          <motion.img
            variants={imgVariant}
            className={styled.img}
            src={iconsArray[randomNumber[0]]}
          />
          <motion.img
            variants={imgVariant}
            className={styled.img}
            src={iconsArray[randomNumber[1]]}
          />
          <motion.img
            variants={imgVariant}
            className={styled.img}
            src={iconsArray[randomNumber[2]]}
          />
          <motion.img
            variants={imgVariant}
            className={styled.img}
            src={iconsArray[randomNumber[3]]}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Loading;
