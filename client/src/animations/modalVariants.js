const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 40,
    },
  },
};

export default modalVariants;
