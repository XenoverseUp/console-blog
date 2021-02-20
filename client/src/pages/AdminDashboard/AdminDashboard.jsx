import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useCurrentWidth, useScroll } from "../../hooks";
import AdminServices from "../../services/AdminServices";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  ResponsiveNavBar,
  AdminCard,
  SplitText,
  ConditionalSimpleBar,
} from "../../components";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import { card } from "../../animations/cardVariants.js";
import PromoteImg from "../../assets/img/promote.svg";

import "./AdminDashboard.scss";
import { EditRounded, FavoriteRounded } from "@material-ui/icons";
import { ReactComponent as User } from "../../assets/img/user.svg";
import { ReactComponent as MenuBookRounded } from "../../assets/img/open-book.svg";
import { ReactComponent as Views } from "../../assets/img/views.svg";
import tapping from "../../animations/tapping";
import FakeData from "../../fakeData";
import avatar from "../../assets/img/admin0.png";

const EmptyLight = lazy(() => import("./Lazies/EmptyLight"));
const EmptyDark = lazy(() => import("./Lazies/EmptyDark"));
const HorizontalScroll = lazy(() =>
  import("../../components/HorizontalScroll/HorizontalScroll")
);

// BreakPoint : 1050px;

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();
  const [width] = useCurrentWidth();

  const [pendingBlogs, setPendingBlogs] = useState([]);

  useScroll({});

  useEffect(() => {
    // fetchData
    setPendingBlogs(FakeData);
  }, []);

  return (
    <ConditionalSimpleBar>
      <motion.div
        variants={translateDownAndFadeOut}
        initial="initial"
        animate="visible"
        exit="exit"
        onAnimationStart={() => (document.body.style.overflow = "hidden")}
        onAnimationComplete={() => (document.body.style.overflow = "auto")}
      >
        <ResponsiveNavBar />
        <div className={`admin-dashboard ${theme}`}>
          <div className="container">
            {width > 1050 && (
              <div className="sidebar">
                <motion.div
                  variants={card(1)}
                  initial="initial"
                  animate="visible"
                  className="box writing"
                >
                  <article>
                    <p>Yazı</p>
                    <h1>103</h1>
                  </article>
                  <div className="icon-container">
                    <div className="outer">
                      <MenuBookRounded />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={card(2)}
                  initial="initial"
                  animate="visible"
                  className="box views"
                >
                  <article>
                    <p>Görüntülenme</p>
                    <h1>6025</h1>
                  </article>
                  <div className="icon-container">
                    <div className="outer">
                      <Views />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={card(3)}
                  initial="initial"
                  animate="visible"
                  className="box likes"
                >
                  <article>
                    <p>Beğeni</p>
                    <h1>1523</h1>
                  </article>
                  <div className="icon-container">
                    <div className="outer">
                      <FavoriteRounded />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={card(4)}
                  initial="initial"
                  animate="visible"
                  className="box editors"
                >
                  <article>
                    <p>Editör</p>
                    <h1>773</h1>
                  </article>
                  <div className="icon-container">
                    <div className="outer">
                      <EditRounded />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={card(5)}
                  initial="initial"
                  animate="visible"
                  className="box users"
                >
                  <article>
                    <p>Kullanıcı</p>
                    <h1>602</h1>
                  </article>
                  <div className="icon-container">
                    <div className="outer">
                      <User />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            <div className="main">
              <motion.div
                variants={card(0)}
                initial="initial"
                animate="visible"
                className="welcome"
              >
                <div className="avatar">
                  <img src={avatar} alt="avatar" />
                </div>
                <div className="content">
                  <h1>
                    <SplitText
                      initial={{ y: "100%" }}
                      animate="visible"
                      exit="exit"
                      variants={{
                        visible: (i) => ({
                          y: 0,
                          transition: {
                            delay: i * 0.1 + 0.1,
                            type: "spring",
                            stiffness: 150,
                          },
                        }),
                        exit: (i) => ({
                          y: "100%",
                          transition: {
                            delay: i * 0.1,
                            type: "tween",
                            duration: 0.5,
                          },
                        }),
                      }}
                    >
                      {user.role === "admin"
                        ? `Yönetici Paneline Hoşgeldin ${
                            user.userName.split(" ")[0]
                          }!`
                        : `Süper Yönetici Paneline Hoşgeldin ${
                            user.userName.split(" ")[0]
                          }!`}
                    </SplitText>
                  </h1>
                  <p>
                    {user.role === "admin"
                      ? "Buradan çeşitli istatistiklere ulaşabilir ve yayınlanmayı bekleyen yazıları inceleyebilirsin."
                      : "Buradan çeşitli istatistiklere ulaşabilir, yayınlanmayı bekleyen yazıları inceleyebilir ve kullanıcıların rollerini düzenleyebilirsin. "}
                  </p>
                </div>
              </motion.div>
              {user.role === "super-admin" && (
                <motion.div
                  initial="initial"
                  animate="visible"
                  variants={card(4)}
                  whileTap={tapping}
                  onClick={() =>
                    history.push({
                      pathname: "/admin/promote",
                      state: { from: location.pathname },
                    })
                  }
                  className="promote"
                >
                  <p>Rolleri Düzenle</p>
                  <div className="image-container">
                    <img src={PromoteImg} alt="Promote" />
                  </div>
                </motion.div>
              )}

              {width <= 1050 && (
                <HorizontalScroll>
                  <div
                    className="sidebar"
                    style={{
                      flexDirection: "row",
                      width: "auto",
                      paddingRight: 0,
                    }}
                  >
                    <motion.div
                      variants={card(1)}
                      initial="initial"
                      animate="visible"
                      className="box writing"
                    >
                      <article>
                        <p>Yazı</p>
                        <h1>103</h1>
                      </article>
                      <div className="icon-container">
                        <div className="outer">
                          <MenuBookRounded />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={card(2)}
                      initial="initial"
                      animate="visible"
                      className="box views"
                    >
                      <article>
                        <p>Görüntülenme</p>
                        <h1>6025</h1>
                      </article>
                      <div className="icon-container">
                        <div className="outer">
                          <Views />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={card(3)}
                      initial="initial"
                      animate="visible"
                      className="box likes"
                    >
                      <article>
                        <p>Beğeni</p>
                        <h1>1523</h1>
                      </article>
                      <div className="icon-container">
                        <div className="outer">
                          <FavoriteRounded />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={card(4)}
                      initial="initial"
                      animate="visible"
                      className="box editors"
                    >
                      <article>
                        <p>Editör</p>
                        <h1>773</h1>
                      </article>
                      <div className="icon-container">
                        <div className="outer">
                          <EditRounded />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={card(5)}
                      initial="initial"
                      animate="visible"
                      className="box users"
                    >
                      <article>
                        <p>Kullanıcı</p>
                        <h1>602</h1>
                      </article>
                      <div className="icon-container">
                        <div className="outer">
                          <User />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </HorizontalScroll>
              )}

              {pendingBlogs.length === 0 ? (
                <Suspense fallback="Loading...">
                  <motion.div
                    variants={user.role === "super-admin" ? card(5) : card(4)}
                    className="pending empty"
                  >
                    <main>
                      {theme === "light" ? <EmptyLight /> : <EmptyDark />}
                      <div className="separator"></div>
                      <p>
                        Yayınlanmayı bekleyen herhangi bir yazı yok. Eğer olursa
                        burada görünecek.
                      </p>
                    </main>
                  </motion.div>
                </Suspense>
              ) : (
                <motion.div variants={card(6)} className="pending">
                  <header>
                    <h1>
                      Bekleyen Yazılar <span>{pendingBlogs.length}</span>
                    </h1>
                  </header>
                  {pendingBlogs.map(({ title, coverImagePath, author, id }) => (
                    <AdminCard
                      theme={theme}
                      coverImagePath={coverImagePath}
                      title={title}
                      author={author}
                      id={id}
                      key={id + title}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default AdminDashboard;
