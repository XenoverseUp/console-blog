export const card = (i) => ({
  initial: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      delay: i * 0.2,
    },
  },
});
