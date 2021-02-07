import { useContext, useState, useEffect, useRef, lazy, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import AddImg from "../../assets/img/add.jpg";
import { motion } from "framer-motion";
import {
  FavoriteRounded,
  ChatBubbleRounded,
  KeyboardArrowRightRounded,
  VisibilityRounded,
  CreateRounded,
  Instagram,
  Facebook,
  Twitter,
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

import "./EditorDashboard.scss";

import fakeData from "../../fakeData2";
import { Button, NavBar, SplitText } from "../../components";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import { card } from "../../animations/cardVariants";
import tapping from "../../animations/tapping";

const IMG0 = lazy(() => import("./Lazies/IMG0"));
const IMG1 = lazy(() => import("./Lazies/IMG1"));
const IMG2 = lazy(() => import("./Lazies/IMG2"));
const IMG3 = lazy(() => import("./Lazies/IMG3"));
const IMG4 = lazy(() => import("./Lazies/IMG4"));
const IMG5 = lazy(() => import("./Lazies/IMG5"));
const IMG6 = lazy(() => import("./Lazies/IMG6"));
const IMG7 = lazy(() => import("./Lazies/IMG7"));

const EditorDashboard = () => {
  const [topBlog, setTopBlog] = useState({});
  const [random] = useState(Math.floor(Math.random() * 8));

  const history = useHistory();

  useEffect(() => {
    setTopBlog(fakeData); // fetch and set data
  }, []);

  let location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      variants={translateDownAndFadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
      onAnimationStart={() => (document.body.style.overflow = "hidden")}
      onAnimationComplete={() => (document.body.style.overflow = "auto")}
    >
      <NavBar />
      <div className={`editor-dashboard ${theme}`}>
        <div className="container">
          <motion.div
            variants={card(0)}
            initial="initial"
            animate="visible"
            whileTap={tapping}
            onClick={() =>
              history.push({
                pathname: "/editor/add",
                state: { from: location.pathname },
              })
            }
            className="box add"
          >
            <img src={AddImg} alt="create-writing" />
            <p>
              <CreateRounded /> Yazı Oluştur
            </p>
          </motion.div>

          <motion.div
            variants={card(1)}
            initial="initial"
            animate="visible"
            className="box welcome"
          >
            <div className="avatar">
              <Suspense fallback="Loading...">
                {random === 0 ? (
                  <IMG0 />
                ) : random === 1 ? (
                  <IMG1 />
                ) : random === 2 ? (
                  <IMG2 />
                ) : random === 3 ? (
                  <IMG3 />
                ) : random === 4 ? (
                  <IMG4 />
                ) : random === 5 ? (
                  <IMG5 />
                ) : random === 6 ? (
                  <IMG6 />
                ) : (
                  <IMG7 />
                )}
              </Suspense>
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
                  {`Editör Paneline Hoşgeldin ${user.userName.split(" ")[0]}!`}
                </SplitText>
              </h1>
              <p>
                Buradan çeşitli istatistiklere ulaşabilir ve yayın yapabilirsin.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={card(2)}
            initial="initial"
            animate="visible"
            className="box most-viewed"
          >
            <main>
              <div
                className="cover"
                style={{
                  background: `url(${topBlog?.coverImagePath}) no-repeat center / cover`,
                }}
              >
                <div className="stats">
                  <div className="likes">
                    <FavoriteRounded />
                    <div className="separator"></div>
                    <p>{topBlog?.likes}</p>
                  </div>
                  <div className="comments">
                    <ChatBubbleRounded />
                    <div className="separator"></div>
                    <p>{topBlog.comments?.length}</p>
                  </div>
                  <div className="views">
                    <VisibilityRounded />
                    <div className="separator"></div>
                    <p>{topBlog.views}</p>
                  </div>
                </div>
              </div>
              <div className="info">
                <h1>
                  {topBlog.title?.split(" ").length > 5
                    ? topBlog.title?.split(" ").slice(0, 5).join(" ") + "..."
                    : topBlog.title}
                </h1>
                <p>
                  {" "}
                  {topBlog.subtitle?.split(" ").length > 10
                    ? topBlog.subtitle?.split(" ").slice(0, 10).join(" ") +
                      "..."
                    : topBlog.subtitle}
                </p>
                <div className="separator"></div>
                <footer>
                  <Button
                    type="button"
                    rightIcon={<KeyboardArrowRightRounded />}
                    to={`/blog/${topBlog.id}`}
                  >
                    Yazına git
                  </Button>
                  <div className="separator"></div>
                  <div className="social">
                    <Tooltip
                      enterDelay={150}
                      leaveDelay={100}
                      title="Instagram"
                      placement="bottom"
                    >
                      <div className="instagram">
                        <Instagram />
                      </div>
                    </Tooltip>
                    <Tooltip
                      enterDelay={150}
                      leaveDelay={100}
                      title="Twitter"
                      placement="bottom"
                    >
                      <div className="twitter">
                        <Twitter />
                      </div>
                    </Tooltip>
                    <Tooltip
                      enterDelay={150}
                      leaveDelay={100}
                      title="Facebook"
                      placement="bottom"
                    >
                      <div className="facebook">
                        <Facebook />
                      </div>
                    </Tooltip>
                  </div>
                </footer>
              </div>
            </main>
          </motion.div>
          <motion.div
            variants={card(3)}
            initial="initial"
            animate="visible"
            className="box writings"
          >
            <div className="ill">
              <svg
                className="book-shelf"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 84 94"
              >
                <path
                  fill="none"
                  d="M37.612 92.805L4.487 73.71c-2.75-1.587-4.45-4.52-4.45-7.687L.008 27.877c-.003-3.154 1.676-6.063 4.405-7.634L37.558 1.167c2.73-1.57 6.096-1.566 8.835.013l33.124 19.096c2.75 1.586 4.45 4.518 4.45 7.686l.028 38.146c.002 3.154-1.677 6.063-4.406 7.634L46.445 92.818c-2.73 1.57-6.096 1.566-8.834-.013z"
                />
                <g
                  className="book-shelf__book book-shelf__book--one"
                  fillRule="evenodd"
                >
                  <path
                    fill="#5199fc"
                    d="M31 29h4c1.105 0 2 .895 2 2v29c0 1.105-.895 2-2 2h-4c-1.105 0-2-.895-2-2V31c0-1.105.895-2 2-2z"
                  />
                  <path
                    fill="#afd7fb"
                    d="M34 36h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1s-.448 1-1 1zm-2 1h2c.552 0 1 .448 1 1s-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1z"
                  />
                </g>
                <g
                  className="book-shelf__book book-shelf__book--two"
                  fillRule="evenodd"
                >
                  <path
                    fill="#ff9868"
                    d="M39 34h6c1.105 0 2 .895 2 2v24c0 1.105-.895 2-2 2h-6c-1.105 0-2-.895-2-2V36c0-1.105.895-2 2-2z"
                  />
                  <path
                    fill="#d06061"
                    d="M42 38c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z"
                  />
                </g>
                <g
                  className="book-shelf__book book-shelf__book--three"
                  fillRule="evenodd"
                >
                  <path
                    fill="#ff5068"
                    d="M49 32h2c1.105 0 2 .86 2 1.92v25.906c0 1.06-.895 1.92-2 1.92h-2c-1.105 0-2-.86-2-1.92V33.92c0-1.06.895-1.92 2-1.92z"
                  />
                  <path
                    fill="#d93368"
                    d="M50 35c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1z"
                  />
                </g>
                <g fillRule="evenodd">
                  <path
                    className="book-shelf__shelf"
                    fill="#ae8280"
                    d="M21 60h40c1.105 0 2 .895 2 2s-.895 2-2 2H21c-1.105 0-2-.895-2-2s.895-2 2-2z"
                  />
                  <path
                    fill="#855f6d"
                    d="M51.5 67c-.828 0-1.5-.672-1.5-1.5V64h3v1.5c0 .828-.672 1.5-1.5 1.5zm-21 0c-.828 0-1.5-.672-1.5-1.5V64h3v1.5c0 .828-.672 1.5-1.5 1.5z"
                  />
                </g>
              </svg>
            </div>
            <div className="content">
              <main>
                <p>Toplam</p>
                <h1>47</h1>
                <p>yazı yayınladın.</p>
              </main>
            </div>
          </motion.div>
          <motion.div
            variants={card(4)}
            initial="initial"
            animate="visible"
            className="box pending"
          >
            <div className="ill">
              <div className="clock">
                <div className="top"></div>
                <div className="right"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="center"></div>
                <div className="hour"></div>
                <div className="minute"></div>
                <div className="second"></div>
              </div>
            </div>
            <div className="content">
              <main>
                <p>Yazılarından</p>
                <h1>5</h1>
                <p>tanesi beklemede.</p>
              </main>
            </div>
          </motion.div>
          <motion.div
            variants={card(5)}
            initial="initial"
            animate="visible"
            className="box likes"
          >
            <div className="ill">
              <FavoriteRounded />
            </div>
            <div className="content">
              <main>
                <p>Toplam</p>
                <h1>1542</h1>
                <p>beğeni aldın.</p>
              </main>
            </div>
          </motion.div>
          <motion.div
            variants={card(6)}
            initial="initial"
            animate="visible"
            className="box views"
          >
            <div className="ill">
              <svg
                className="eye"
                x="0px"
                y="0px"
                viewBox="0 0 180.6 81.7"
                xmlSpace="preserve"
              >
                <path
                  id="XMLID_11_"
                  className="st0"
                  style={{ fill: "#FFFFFF" }}
                  d="M90.3,0C51.3,0,17.4,16.5,0,40.9c17.4,24.3,51.3,40.9,90.3,40.9c39,0,72.9-16.5,90.3-40.9
    C163.2,16.5,129.3,0,90.3,0z"
                />
                <g id="XMLID_12_" className="eye-center">
                  <circle id="XMLID_4_" cx="90.3" cy="40.9" r="30.5" />
                  <circle
                    id="XMLID_10_"
                    className="st0"
                    cx="103.5"
                    cy="26.8"
                    r="5.2"
                  />
                </g>
              </svg>
            </div>
            <div className="content">
              <main>
                <p>Yazıların</p>
                <h1>6239</h1>
                <p>defa okundu.</p>
              </main>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditorDashboard;
