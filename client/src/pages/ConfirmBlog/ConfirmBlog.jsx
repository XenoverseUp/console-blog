import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
  ConditionalSimpleBar,
  Preloader,
} from "../../components";
import { motion } from "framer-motion";
import TranslateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import tapping from "../../animations/tapping";

import "./ConfirmBlog.scss";
import { useQuery } from "react-query";

const ConfirmBlog = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["confirm-blog", { id }],
    AdminServices.getSingleUnpublishedBlog
  );

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useScroll({});

  const blogActions = (id, type = "publish") => {
    switch (type) {
      case "publish":
        AdminServices.confirmBlog(id).then(() =>
          history.push({
            pathname: "/admin",
            state: { from: location.pathname },
          })
        );

        break;
      case "delete":
        AdminServices.deleteBlog(id).then(() =>
          history.push({
            pathname: "/admin",
            state: { from: location.pathname },
          })
        );

        break;
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <ConditionalSimpleBar>
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
          action={() => blogActions(data.blog._id)}
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
          action={() => blogActions(data.blog._id, "delete")}
          choices={{ positive: "Sil" }}
        >
          Eğer bu yazıyı silersen, ona bir daha ulaşamayacaksın.
        </PromptModal>

        <BlogContainer>
          <BlogHeader
            title={data.blog.title}
            subtitle={data.blog.subtitle}
            authorName={data.blog.author?.userName}
            duration={Math.ceil(data.blog.content.length / 800)}
            category={data.blog.category}
            coverImagePath={data.blog.coverImagePath}
          />
          <ContentWrapper>
            <Sidebar likes={data.blog.likes} date={new Date()} />
            <SanitizedContent content={data.blog.content} />
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
    </ConditionalSimpleBar>
  );
};

export default ConfirmBlog;
