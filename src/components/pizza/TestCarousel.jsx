import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Plate from "./pizza.png";
const newCarousel = ({ Data }) => {
  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(Data.length - 1);
  const [RightId, setRightId] = useState(1);

  const nextBtn = () => {
    if (LeftId === Data.length - 1) {
      setLeftId(0);
    } else {
      setLeftId(LeftId + 1);
    }

    if (CenterId === Data.length - 1) {
      setCenterId(0);
    } else {
      setCenterId(CenterId + 1);
    }

    if (RightId === Data.length - 1) {
      setRightId(0);
    } else {
      setRightId(RightId + 1);
    }
    setFlowDirection(true);
  };

  const prevBtn = () => {
    setFlowDirection(false);
    if (LeftId === 0) {
      setLeftId(Data.length - 1);
    } else {
      setLeftId(LeftId - 1);
    }
    if (CenterId === 0) {
      setCenterId(Data.length - 1);
    } else {
      setCenterId(CenterId - 1);
    }
    if (RightId === 0) {
      setRightId(Data.length - 1);
    } else {
      setRightId(RightId - 1);
    }
  };

  const variants = {
    center: {
      x: "0rem",
      opacity: 1,
      scale: 1.2,
      zIndex: "5",
      filter: "brightness(100%)",
      backgroundImage: "url(" + Data[CenterId] + ")",
      boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.3)",
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    left: {
      x: "25%",
      opacity: 1,
      filter: "brightness(40%)",
      scale: 0.8,
      backgroundImage: "url(" + Data[LeftId] + ")",
      zIndex: "4",
      boxShadow: "unset",
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    right: {
      backgroundImage: "url(" + Data[RightId] + ")",
      x: "50%",
      opacity: 1,
      filter: "brightness(40%)",
      scale: 0.8,
      boxShadow: "unset",
      zIndex: "3",
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    rightHidden: {
      x: "8rem",
      scale: 0,
      opacity: 0,
    },
    leftHidden: {
      x: "-8rem",
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <div>
      <motion.div className="w-full bg-slate-200 h-[90%] flex items-center justify-center">
        <motion.div className="carouselWrapper space-x-3 bg-slate-100 w-full flex items-center">
          <AnimatePresence initial={false}>
            <motion.div
              className="w-[20%] bg-red-500"
              key={LeftId}
              variants={variants}
              initial={FlowDirection ? "center" : "leftHidden"}
              animate="left"
              exit={"leftHidden"}
            >
              <div className="rounded-full aspect-square w-[75%] relative mx-auto">
                <img src={Plate} alt="Plate" className="absolute inset-0" />
              </div>
            </motion.div>
            <motion.div
              className="w-[60%] space-y-6 shadow-md py-10"
              variants={variants}
              key={CenterId}
              initial={FlowDirection ? "right" : "left"}
              animate="center"
            >
              <div className="rounded-full aspect-square w-[75%] relative mx-auto">
                <img src={Plate} alt="Plate" className="absolute inset-0" />
              </div>

              <div className="w-full space-y-6">
                <h2 className="text-3xl font-bold text-center">Ham Pizza</h2>
                <div className="w-1/2 mx-auto flex items-center justify-between font-semibold">
                  <p className="">S</p>
                  <p className="">S</p>
                  <p className="">S</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="w-[20%] bg-blue-200"
              key={RightId}
              variants={variants}
              initial={FlowDirection ? "rightHidden" : "center"}
              animate="right"
              exit={"rightHidden"}
            >
              <div className="rounded-full aspect-square w-[75%] relative mx-auto">
                <img src={Plate} alt="Plate" className="absolute inset-0" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className="carousel-btns">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            duration: 0.5,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="bwd-btn"
          onClick={prevBtn}
        >
          Back
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            duration: 0.5,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="fwd-btn"
          onClick={nextBtn}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default newCarousel;
