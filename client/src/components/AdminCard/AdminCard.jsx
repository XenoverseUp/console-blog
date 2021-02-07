import React from "react";
import { ScheduleRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import tapping from "../../animations/tapping";
import "./AdminCard.scss";

const AdminCard = ({ theme, coverImagePath, title, author, id }) => {
  return (
    <motion.div whileTap={tapping} className={`admin-card ${theme}`}>
      <Link className="link" to={`/admin/${id}`}>
        <div
          className="cover"
          style={{
            background: `url("${coverImagePath}") no-repeat center / cover`,
          }}
        ></div>
        <div className="info">
          <p>{title}</p>

          <span>{author} </span>
        </div>
        <div className="icon">
          <div className="outer">
            <ScheduleRounded />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AdminCard;
