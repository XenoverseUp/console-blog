import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { getDuration, useCurrentWidth } from "../../hooks";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AnimateSharedLayout, motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut.js";
import "./Blog.scss";
import {
  ResponsiveNavBar,
  BlogContainer,
  BlogHeader,
  ContentWrapper,
  SanitizedContent,
  Sidebar,
  Drawer,
  DrawerItem,
  DrawerHeader,
  CommentPoster,
  ConditionalSimpleBar,
  Preloader,
} from "../../components";
import { AuthContext } from "../../contexts/AuthContext";

import BlogServices from "../../services/BlogServices";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const AuthModal = lazy(() => import("../../components/AuthModal/AuthModal"));

const Blog = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [width] = useCurrentWidth();
  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const [newComments, setNewComments] = useState([]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);

  const { data: metadata, isLoading: isMetaLoading } = useQuery(
    ["blog-meta", { id }],
    BlogServices.getMetadata,
    {
      enabled: isAuthenticated,
    }
  );

  // useEffect(() => console.log(metadata), [metadata]);

  const { data, isLoading } = useQuery(
    ["single-blog", { id }],
    BlogServices.getSinglePublishedBlog
  );

  const likeClick = async () => {
    if (!metadata.liked) {
      await BlogServices.likeBlog(id);
    } else {
      await BlogServices.dislikeBlog(id);
    }
  };

  const bookmarkClick = async () => {
    if (!metadata.bookmarked) {
      await BlogServices.bookmarkBlog(id);
    } else {
      await BlogServices.unBookmarkBlog(id);
    }
  };

  return isLoading || isMetaLoading ? (
    <Preloader />
  ) : (
    <ConditionalSimpleBar>
      <motion.div
        className={`blog ${theme}`}
        variants={translateDownAndFadeOut}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <ResponsiveNavBar
          blogCover={data.blog.coverImagePath}
          blogTitle={data.blog.title}
        />

        {!isAuthenticated && (
          <Suspense fallback="Loading...">
            <AuthModal isOpen={authModal} setIsOpen={setAuthModal} />
          </Suspense>
        )}

        <Drawer
          anchor={width > 600 ? "right" : "left"}
          open={isCommentOpen}
          setOpen={setIsCommentOpen}
        >
          <AnimateSharedLayout>
            <DrawerHeader
              commentLength={data.blog.comments?.length + newComments.length}
            />
            <CommentPoster
              setNewComments={setNewComments}
              newComments={newComments}
              setDrawerState={setIsCommentOpen}
              id={data.blog._id}
            />
            <motion.div>
              <motion.div
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                {newComments.map((comment, i) => (
                  <DrawerItem
                    animated
                    key={i + "new-comment"}
                    postedBy={comment?.postedBy}
                    createdAt={comment?.createdAt}
                  >
                    {comment?.content}
                  </DrawerItem>
                ))}
              </motion.div>

              <motion.div
                layout
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                {data.blog.comments.map((comment, i) => (
                  <DrawerItem
                    key={blog.title + comment?.postedBy + i}
                    postedBy={comment?.postedBy}
                    createdAt={comment?.createdAt}
                  >
                    {comment?.content}
                  </DrawerItem>
                ))}
              </motion.div>
            </motion.div>
          </AnimateSharedLayout>
        </Drawer>

        <BlogContainer>
          <BlogHeader
            title={data.blog.title}
            subtitle={data.blog.subtitle}
            authorName={data.blog.author.userName}
            duration={getDuration(data.blog.content)}
            category={data.blog.category}
            coverImagePath={data.blog.coverImagePath}
          />
          <ContentWrapper>
            <Sidebar
              comments={data.blog.comments?.length + newComments.length}
              date={new Date(data.blog.createdAt)}
              likes={data.blog.likes}
              top={10}
              isLiked={metadata.liked}
              isBookmarked={metadata.bookmarked}
              callbacks={{
                onLikeClick: () =>
                  isAuthenticated ? likeClick() : setAuthModal(true),
                onCommentClick: () => setIsCommentOpen(true),
                onBookmarkClick: () =>
                  isAuthenticated ? bookmarkClick() : setAuthModal(true),
              }}
            />
            <SanitizedContent content={data.blog.content} />
          </ContentWrapper>
        </BlogContainer>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Blog;
