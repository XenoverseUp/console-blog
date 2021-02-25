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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const AuthModal = lazy(() => import("../../components/AuthModal/AuthModal"));

const Blog = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [width] = useCurrentWidth();
  const { id } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [newComments, setNewComments] = useState([]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["single-blog", { id }],
    BlogServices.getSinglePublishedBlog,
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    const liked = data?.[0].isLiked ?? false;
    const likes = data?.[0].likes ?? 0;

    setIsLiked(liked);
    setLikes(likes);
  }, [data]);

  const { mutateAsync: dislike, isLoading: isDislikeLoading } = useMutation(
    BlogServices.dislikeBlog,
    {
      onMutate: async () => {
        await queryClient.cancelQueries("single-blog");
        setIsLiked(false);
        setLikes(likes - 1);
      },

      onSettled: () => queryClient.invalidateQueries("single-blog"),
    }
  );

  const { mutateAsync: like, isLoading: isLikeLoading } = useMutation(
    BlogServices.likeBlog,
    {
      onMutate: async () => {
        await queryClient.cancelQueries("single-blog");
        setIsLiked(true);
        setLikes(likes + 1);
      },

      onSettled: () => queryClient.invalidateQueries("single-blog"),
    }
  );

  const likeClick = async () => {
    if (isLikeLoading || isDislikeLoading) return;
    if (data[0]?.isLiked) {
      await dislike(id);
    } else {
      await like(id);
    }
  };

  const bookmarkClick = async () => {
    if (1) {
      await BlogServices.bookmarkBlog(id);
    } else {
      await BlogServices.unBookmarkBlog(id);
    }
  };

  useEffect(() => console.log(data), [data]);

  return isLoading ? (
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
          blogCover={data[0].coverImagePath}
          blogTitle={data[0].title}
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
              commentLength={data[0].comments?.length + newComments.length}
            />
            <CommentPoster
              setNewComments={setNewComments}
              newComments={newComments}
              setDrawerState={setIsCommentOpen}
              id={data[0]._id}
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
                {data[0].comments.map((comment, i) => (
                  <DrawerItem
                    key={comment?.postedBy + i}
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
            title={data[0].title}
            subtitle={data[0].subtitle}
            authorName={data[0].author.userName}
            duration={getDuration(data[0].content)}
            category={data[0].category}
            coverImagePath={data[0].coverImagePath}
          />
          <ContentWrapper>
            <Sidebar
              comments={data[0].comments?.length + newComments.length}
              date={new Date(data[0].createdAt)}
              likes={isLikeLoading || isDislikeLoading ? likes : data[0].likes}
              top={10}
              isLiked={
                isLikeLoading || isDislikeLoading ? isLiked : data[0].isLiked
              }
              isBookmarked={data[0].isBookmarked}
              callbacks={{
                onLikeClick: () =>
                  isAuthenticated ? likeClick() : setAuthModal(true),
                onCommentClick: () => setIsCommentOpen(true),
                onBookmarkClick: () =>
                  isAuthenticated ? bookmarkClick() : setAuthModal(true),
              }}
            />
            <SanitizedContent content={data[0].content} />
          </ContentWrapper>
        </BlogContainer>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Blog;
