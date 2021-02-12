import { Suspense, useEffect, useState, memo } from "react";
import { lazy, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import MobileMenu from "../MobileMenu/MobileMenu";
import Preloader from "../Preloader/Preloader";
import MenuToggle from "./MenuToggle/MenuToggle";
import "./MobileNavBar.scss";

const IMG0 = lazy(() => import("./Lazies/IMG0"));
const IMG1 = lazy(() => import("./Lazies/IMG1"));
const IMG2 = lazy(() => import("./Lazies/IMG2"));
const IMG3 = lazy(() => import("./Lazies/IMG3"));
const IMG4 = lazy(() => import("./Lazies/IMG4"));
const IMG5 = lazy(() => import("./Lazies/IMG5"));
const IMG6 = lazy(() => import("./Lazies/IMG6"));
const IMG7 = lazy(() => import("./Lazies/IMG7"));
const IMG8 = lazy(() => import("./Lazies/IMG8"));
const IMG9 = lazy(() => import("./Lazies/IMG9"));
const IMG10 = lazy(() => import("./Lazies/IMG10"));
const IMG11 = lazy(() => import("./Lazies/IMG11"));

const MobileNavBar = ({ blogCover, blogTitle }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [random, setRandom] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => setRandom(Math.floor(Math.random() * 12)), []);

  const IMG = () =>
    random === 0 ? (
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
    ) : random === 7 ? (
      <IMG7 />
    ) : random === 8 ? (
      <IMG8 />
    ) : random === 9 ? (
      <IMG9 />
    ) : random === 10 ? (
      <IMG10 />
    ) : (
      <IMG11 />
    );

  return (
    <div className={`mobile-menu-navbar ${theme}`}>
      <div
        className="info"
        onClick={() =>
          history.push({ pathname: "/", state: { from: location.pathname } })
        }
      >
        {blogCover && blogTitle ? (
          <>
            <div className="avatar">
              <img src={blogCover} alt="cover" />
            </div>
            <div className="name">
              {blogTitle.split(" ").length > 4
                ? blogTitle.split(" ").slice(0, 4).join(" ") + "..."
                : blogTitle}
            </div>
          </>
        ) : isAuthenticated && user ? (
          <>
            <div className="avatar">
              <Suspense fallback="">
                <IMG />
              </Suspense>
            </div>
            <div className="name">Merhaba, {user.userName.split(" ")[0]}!</div>
          </>
        ) : (
          <>
            <div className="avatar">
              <Suspense fallback="">
                <IMG />
              </Suspense>
            </div>
            <div className="name">CONSOLE</div>
          </>
        )}
      </div>
      <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileMenu IMG={IMG} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileNavBar;
