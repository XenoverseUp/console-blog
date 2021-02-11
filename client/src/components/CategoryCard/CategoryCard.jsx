import "./CategoryCard.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const CategoryCard = ({ category: { name, path, icon, gradient }, width }) => {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`category-card ${theme}`}>
      <motion.div
        className="main-category-content"
        onClick={() => history.push({ pathname: `/category/${path}` })}
      >
        <motion.div
          whileHover={width > 600 && { y: -5 }}
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
