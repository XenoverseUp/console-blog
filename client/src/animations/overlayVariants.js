export const visibleOverlay = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 0.7,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const hiddenOverlay = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};
