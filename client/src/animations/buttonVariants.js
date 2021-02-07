export default (i = 1) => ({
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    scale: 1,
    opacity: [0, 1, 1],

    transition: {
      type: "tween",
      duration: 0.15 * i,
    },
  },
  exit: {
    scale: 0,
    opacity: [1, 0, 0],
    transition: {
      type: "tween",
      duration: 0.15 * i,
    },
  },
});
