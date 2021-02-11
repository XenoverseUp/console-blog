import { ConditionalSimpleBar } from "../../components";
import { motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";

const Contact = () => {
  return (
    <ConditionalSimpleBar>
      <motion.div
        variants={translateDownAndFadeOut}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        Contact
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Contact;
