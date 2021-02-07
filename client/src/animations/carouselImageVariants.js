export default {
  initial: {
    width: "50%",
  },
  visible: {
    width: "100%",

    transition: {
      stiffness: 500,
    },
  },
  exit: {
    width: "50%",

    transition: {
      stiffness: 30,
    },
  },
};
