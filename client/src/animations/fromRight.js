const fromRight = {
  initial: {
    x: 200,
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
  exit: {
    x: 150,
    opacity: 0,

    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

export default fromRight;
