import "./CategoryCard.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const CategoryCard = ({ category: { name, path, icon, gradient } }) => {
  const history = useHistory();

  return (
    <div className={`category-card`}>
      <motion.div
        className="main-category-content"
        onClick={() => history.push({ pathname: `/category/${path}` })}
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="icon"
          style={{ background: gradient }}
        >
          <motion.div className="icon-holder">{icon}</motion.div>
        </motion.div>
        <p>{name}</p>
      </motion.div>
    </div>
  );
};

export default CategoryCard;
