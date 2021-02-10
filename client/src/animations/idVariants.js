const idVariants = {
  initial: {
    width: 0,
  },
  visible: {
    width: "auto",

    transition: {
      stiffness: 500,
    },
  },
  exit: {
    width: 0,
    transition: {
      stiffness: 30,
    },
  },
};

export default idVariants;
