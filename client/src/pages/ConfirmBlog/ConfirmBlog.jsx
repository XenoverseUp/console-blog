import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useScroll } from "../../hooks";
import { ThemeContext } from "../../contexts/ThemeContext";
import AdminServices from "../../services/AdminServices";
import { Delete, KeyboardArrowLeft, PublishRounded } from "@material-ui/icons";
import {
  Sidebar,
  SanitizedContent,
  ContentWrapper,
  BlogHeader,
  Button,
  PromptModal,
  BlogContainer,
} from "../../components";
import { motion } from "framer-motion";
import TranslateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import tapping from "../../animations/tapping";

import "./ConfirmBlog.scss";

import fakeData from "../../fakeData2";

const ConfirmBlog = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const history = useHistory();

  const [blog, setBlog] = useState({});
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState(false);

  const duration = blog.content ? Math.ceil(blog.content.length / 800) : 0;

  useScroll({});

  const blogActions = (id, type = "publish") => {
    switch (type) {
      case "publish":
        AdminServices.confirmBlog(id)
          .then(() =>
            history.push({
              pathname: "/admin",
              state: { from: location.pathname },
            })
          )
          .catch(() => setError(true));
        break;
      case "delete":
        AdminServices.deleteBlog(id)
          .then(() =>
            history.push({
              pathname: "/admin",
              state: { from: location.pathname },
            })
          )
          .catch(() => setError(true));
        break;
    }
  };

  useEffect(() => {
    // fetchBlogData
    setBlog(fakeData);
  }, []);

  return (
    <motion.div
      variants={TranslateDownAndFadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
      className={`confirm-blog ${theme}`}
    >
      <motion.div
        onClick={() =>
          history.push({
            pathname: "/admin",
            state: { from: location.pathname },
          })
        }
        whileTap={tapping}
        style={{ cursor: "pointer" }}
        className="back"
      >
        <KeyboardArrowLeft /> <p>Ana sayfa</p>
      </motion.div>

      <PromptModal
        isOpen={isPublishModalOpen}
        setIsOpen={setIsPublishModalOpen}
        severity="success"
        icon={<PublishRounded />}
        title="Yayınlamak istediğine emin misin?"
        action={
          () => console.log("Published!")
          // , blogActions(blog.id)
        }
        choices={{ positive: "Yayınla", negative: "Vazgeç" }}
      >
        Yazıyı yayınladığında binlerce insana ulaşacaksın.
      </PromptModal>

      <PromptModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        severity="error"
        icon={<Delete />}
        title="Silmek istediğine emin misin?"
        action={
          () => console.log("Deleted!")
          // , blogActions(id, "delete")
        }
        choices={{ positive: "Sil" }}
      >
        Eğer bu yazıyı silersen, ona bir daha ulaşamayacaksın.
      </PromptModal>

      <BlogContainer>
        <BlogHeader
          title={blog.title}
          subtitle={blog.subtitle}
          authorName={blog.author}
          duration={duration}
          category={blog.category}
          coverImagePath={blog.coverImagePath}
        />
        <ContentWrapper>
          <Sidebar likes={blog.likes} date={new Date()} />
          <SanitizedContent content={blog.content} />
        </ContentWrapper>
      </BlogContainer>

      <div className="controllers">
        <Button
          type="button"
          leftIcon={<Delete />}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Sil
        </Button>
        <div className="separator"></div>
        <Button
          type="button"
          rightIcon={<PublishRounded />}
          onClick={() => setIsPublishModalOpen(true)}
        >
          Yayınla
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfirmBlog;
