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
      y: "0rem",
      opacity: 1,
      scale: 1,
      zIndex: "5",
      // backgroundImage: "url(" + Data[CenterId] + ")",
      transition: {
        type: "spring",
        duration: 2.5,
      },
    },
    left: {
      x: "-75%",
      y: "50%",
      opacity: 1,
      // filter: "brightness(40%)",
      scale: 0.5,
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
      // filter: "brightness(40%)",
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

  // const variants = {
  //   center: {
  //     x: "0rem",
  //     opacity: 1,
  //     // scale: 1.2,
  //     zIndex: "5",
  //     filter: "brightness(100%)",
  //     backgroundImage: "url(" + Data[CenterId] + ")",
  //     boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.3)",
  //     transition: {
  //       type: "spring",
  //       duration: 1,
  //     },
  //   },
  // };

  return (
    <motion.div className="relative py-20">
      <motion.div className="w-full bg-red-500 carousel-wrapper">
        <AnimatePresence initial={false}>
          <motion.div className="w-[25%]">
            <div className="absolute top-[50%] -left-[10%] -translate-y-[50%] aspect-square rounded-full w-[25%] bg-green-500 overflow-hidden">
              <motion.img
                key={LeftId}
                variants={variants}
                initial={FlowDirection ? "center" : "leftHidden"}
                animate="left"
                exit={"leftHidden"}
                src={Data[LeftId].image}
                alt=""
              />
            </div>
          </motion.div>
          <motion.div className="flex-grow max-w[50%] bg-white px-2 pb-20 rounded-[120px] space-y-10">
            <div
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1620791144170-8a443bf37a33?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                objectFit: "cover",
              }}
              className="relative w-full aspect-square bg-blue-500 rounded-full"
            >
              <motion.img
                variants={variants}
                key={CenterId}
                initial={FlowDirection ? "right" : "left"}
                animate="center"
                src={Data[CenterId].image}
                className="w-full h-full rounded-full absolute inset-0 p-2"
                alt=""
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-center">
                {Data[CenterId].name}
              </h3>

              <p className="text-3xl font-bold text-center">
                ${Data[CenterId].price}
              </p>
            </div>
          </motion.div>
          <motion.div className="w-[25%]">
            <motion.div className="absolute top-[50%] -translate-y-[50%] -right-[10%] aspect-square w-[25%] rounded-full bg-blue-500">
              <motion.img
                key={RightId}
                variants={variants}
                initial={FlowDirection ? "rightHidden" : "center"}
                animate="right"
                exit={"rightHidden"}
                src={Data[RightId].image}
                alt=""
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
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
    </motion.div>
  );
};

export default newCarousel;
