export default {
  initial: {
    y: "100%",
  },

  visible: (i) => ({
    y: 0,
    transition: {
      delay: i * 0.1 + 0.1,
      type: "spring",
      stiffness: 150,
    },
  }),

  exit: (i) => ({
    y: "100%",
    transition: {
      delay: i * 0.1,
      type: "tween",
      duration: 0.5,
    },
  }),
};
