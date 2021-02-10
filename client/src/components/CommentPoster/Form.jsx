import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentValidationSchema } from "../../validation";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import tapping from "../../animations/tapping";
import buttonVariants from "../../animations/buttonVariants";
import { CommentOutlined, SendRounded } from "@material-ui/icons";
import { TextareaAutosize } from "@material-ui/core";
// import BlogServices from "../../services/BlogServices.js";
import { AuthContext } from "../../contexts/AuthContext";

const Form = ({ id, setNewComments, newComments }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");

  const validity = new RegExp(/.*\S./);

  const { register, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(commentValidationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    setNewComments([
      ...newComments,
      { postedBy: user.userName, createdAt: new Date(), content: data.content },
    ]);

    setContent("");
    reset();

    // await BlogServices.addComment(data, id);
  };

  return (
    <div className={`comment-poster authenticated ${theme}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="avatar">
          <CommentOutlined />
        </div>
        <motion.div className={`content ${theme}`}>
          <TextareaAutosize
            onChange={() => setContent(getValues("content"))}
            spellCheck="false"
            ref={register}
            name="content"
            id="comment"
            placeholder="✎  Bir yorum ekle"
          />
          <motion.div layout layoutId="controllers" className="controllers">
            <AnimatePresence exitBeforeEnter>
              {validity.test(content) && (
                <motion.button
                  type="submit"
                  className={`button ${theme}`}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  whileTap={tapping}
                  variants={buttonVariants}
                >
                  Yorum Yap
                  <span className="rightIcon">
                    <SendRounded />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};

export default Form;
