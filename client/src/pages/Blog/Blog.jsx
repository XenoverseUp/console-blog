import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getDuration } from "../../hooks";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut.js";
import "./Blog.scss";
import {
  NavBar,
  BlogContainer,
  BlogHeader,
  ContentWrapper,
  SanitizedContent,
  Sidebar,
  Drawer,
  DrawerItem,
  DrawerHeader,
  CommentPoster,
} from "../../components";
import { AuthContext } from "../../contexts/AuthContext";

import fakeData2 from "../../fakeData2";
import BlogServices from "../../services/BlogServices";

const Blog = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [blog, setBlog] = useState({});
  const [newComments, setNewComments] = useState([]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => setBlog(fakeData2), []); // Fetch data, set states, update views

  const likeClick = async () => {
    if (!isLiked) {
      // await BlogServices.likeBlog(blog.id);
      setBlog({ ...blog, likes: blog.likes + 1 });
      setIsLiked(true);
    } else {
      // await BlogServices.dislikeBlog(blog.id);
      setBlog({ ...blog, likes: blog.likes - 1 });
      setIsLiked(false);
    }
  };

  const bookmarkClick = async () => {
    if (!isBookmarked) {
      // await BlogServices.likeBlog(blog.id);
      setIsBookmarked(true);
    } else {
      // await BlogServices.dislikeBlog(blog.id);
      setIsBookmarked(false);
    }
  };

  const redirectToLogin = () =>
    history.push({
      pathname: "/login",
      state: { from: location.pathname },
    });

  return (
    <motion.div
      className={`blog ${theme}`}
      variants={translateDownAndFadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <NavBar />

      <Drawer open={isCommentOpen} setOpen={setIsCommentOpen}>
        <DrawerHeader
          commentLength={blog.comments?.length + newComments.length}
        />
        <CommentPoster
          setNewComments={setNewComments}
          newComments={newComments}
          setDrawerState={setIsCommentOpen}
          id={blog.id}
        />
        <motion.div layout layoutId="container">
          <motion.div
            layout
            layoutId="containerV2"
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            {newComments.map((comment, i) => (
              <DrawerItem
                animated
                key={blog.title + comment?.postedBy + i + "new"}
                postedBy={comment?.postedBy}
                createdAt={comment?.createdAt}
              >
                {comment?.content}
              </DrawerItem>
            ))}
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {blog.comments?.map((comment, i) => (
              <DrawerItem
                key={blog.title + comment?.postedBy + i}
                postedBy={comment?.postedBy}
                createdAt={comment?.createdAt}
              >
                {comment?.content}
              </DrawerItem>
            ))}
          </div>
        </motion.div>
      </Drawer>

      <BlogContainer>
        <BlogHeader
          title={blog.title}
          subtitle={blog.subtitle}
          authorName={blog.author}
          duration={getDuration(blog.content)}
          category={blog.category}
          coverImagePath={blog.coverImagePath}
        />
        <ContentWrapper>
          <Sidebar
            comments={blog.comments?.length + newComments.length}
            date={new Date()}
            likes={blog.likes}
            top={10}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            callbacks={{
              onLikeClick: () =>
                isAuthenticated ? likeClick() : redirectToLogin(),
              onCommentClick: () => setIsCommentOpen(true),
              onBookmarkClick: () =>
                isAuthenticated ? bookmarkClick() : redirectToLogin(),
            }}
          />
          <SanitizedContent content={blog.content} />
        </ContentWrapper>
      </BlogContainer>
    </motion.div>
  );
};

export default Blog;
