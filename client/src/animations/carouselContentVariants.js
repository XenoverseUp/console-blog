const carouselContentVariants = (i = 5, o = 0.5) => ({
  initial: {
    y: i,
    opacity: o,
  },
  visible: {
    opacity: 1,
    y: 0,

    transition: {
      stiffness: 500,
    },
  },
  exit: {
    y: i,
    opacity: o,

    transition: {
      stiffness: 30,
    },
  },
});

export default carouselContentVariants;
