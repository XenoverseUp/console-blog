const carouselImageVariants = (direction) => ({
  initial: {
    ...(direction ? { height: "50%" } : { width: "50%" }),
  },
  visible: {
    ...(direction ? { height: "100%" } : { width: "100%" }),

    transition: {
      stiffness: 500,
    },
  },
  exit: {
    ...(direction ? { height: "50%" } : { width: "50%" }),

    transition: {
      stiffness: 30,
    },
  },
});

export default carouselImageVariants;
