import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import BlogServices from "../../services/BlogServices";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import "./Card.scss";
import { useMutation } from "react-query";

const Card = ({ imgSrc, id, title, author, queryClient, intersectionRef }) => {
  const { theme } = useContext(ThemeContext);

  const [isBookmarked, setIsBookmarked] = useState(true);

  const { mutateAsync: unBookmark, isLoading } = useMutation(
    BlogServices.unBookmarkBlog,
    {
      onMutate: async () => {
        await queryClient.cancelQueries("bookmarked-blogs");
        setIsBookmarked(false);
      },

      onSettled: () => {
        queryClient.invalidateQueries("bookmarked-blogs");
      },
    }
  );

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 550, damping: 50, mass: 0.2 }}
    >
      <AnimatePresence>
        {isBookmarked && (
          <motion.div
            exit={{
              scale: 0.7,
              opacity: 0,
              transition: {
                type: "spring",
                stiffness: 50,
              },
            }}
            className={`card ${theme}`}
            {...(intersectionRef && { ref: intersectionRef })}
          >
            <Link
              to={`/blog/${id}`}
              className="cover"
              style={{
                background: `url("${imgSrc}") no-repeat center / cover`,
              }}
            ></Link>

            <Link to={`/blog/${id}`} className="title">
              <p>
                {title.split(" ").length > 9
                  ? title.split(" ").slice(0, 9).join(" ") + "..."
                  : title}
              </p>

              <span>{author}</span>
            </Link>

            <Button
              style={
                theme === "dark" ? { color: "#f5f5f5" } : { color: "#252525" }
              }
              onClick={() => {
                if (isLoading) return;
                unBookmark(id);
              }}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;
