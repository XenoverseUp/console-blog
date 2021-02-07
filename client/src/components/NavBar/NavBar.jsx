import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import { useCurrentWidth } from "../../hooks";
import { MobileMenu } from "../../components";
import {
  AllInclusive,
  Brightness4,
  Search,
  KeyboardArrowDown,
  HowToReg,
  Chat,
  AccountCircle,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Category,
  Face,
  Bookmark,
  MeetingRoom,
  Edit,
  Dashboard,
  MenuRounded,
} from "@material-ui/icons";

import "./NavBar.scss";
import { Button } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import AuthServices from "../../services/AuthServices";
import Overlay from "../Overlay/Overlay";

const NavBar = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  let [currentWidth] = useCurrentWidth();

  let location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className={`${theme}`}>
      <Overlay zIndex={75} hidden open={open} onClick={() => setOpen(false)} />
      <Link
        to={{ pathname: "/", state: { from: location.pathname } }}
        className="logo"
      >
        <AllInclusive />
        <h1>CONSOLE</h1>
      </Link>

      {currentWidth > 700 ? (
        <div className="search">
          <form onSubmit={handleSubmit}>
            <Button
              style={{
                borderRadius: 9999,
                border: 0,
                color: "transparent",
                height: 30,
                padding: "0",
              }}
              type="submit"
            >
              <Search
                style={
                  theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }
                }
              />
            </Button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Console içinde ara..."
              autoComplete="off"
            />
          </form>
        </div>
      ) : null}

      <div className="toolbar">
        <Button
          onClick={() => {
            theme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          <Brightness4
            style={theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }}
          />
        </Button>

        {currentWidth > 700 ? (
          <DropDownNavItem
            name={
              !isAuthenticated || !user
                ? "Bize Katıl"
                : isAuthenticated && user
                ? `${user.userName}`
                : null
            }
            open={open}
            setOpen={setOpen}
            isAuthenticated={isAuthenticated}
          >
            <DropDownMenu />
          </DropDownNavItem>
        ) : (
          <React.Fragment>
            <button
              className="mobile-menu"
              onClick={() => setOpenMobile(!openMobile)}
            >
              <MenuRounded
                style={
                  theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }
                }
              />
            </button>
            <MobileMenu open={openMobile} setOpen={setOpenMobile} />
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

const DropDownNavItem = ({
  children,
  name,
  open,
  setOpen,
  isAuthenticated,
}) => {
  return (
    <div className="nav-item">
      <Button onClick={() => setOpen(!open)} className="name">
        <p>{isAuthenticated ? name.split(" ")[0] : name}</p>
        <KeyboardArrowDown />
      </Button>

      {open && React.cloneElement(children, { setOpen })}
    </div>
  );
};

const DropDownMenu = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const categories = useContext(CategoryContext);

  const history = useHistory();
  let location = useLocation();

  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const DropDownMenuItem = ({
    children,
    leftIcon,
    rightIcon,
    to,
    goToMenu,
    logout,
    name,
  }) => {
    if (to) {
      return (
        <Link
          to={{ pathname: to, state: { from: location.pathname } }}
          className="menu-item"
          onClick={() => props.setOpen(false)}
        >
          <span className="icon-button"> {leftIcon}</span>
          {children}

          <span className="icon-right"> {rightIcon}</span>
        </Link>
      );
    } else {
      return (
        <div
          className={name ? "menu-item user-info" : "menu-item"}
          onClick={async () => {
            if (goToMenu) {
              setActiveMenu(goToMenu);
              return;
            } else if (logout) {
              await AuthServices.logout();
              setUser({ userName: "", email: "", role: "" });
              setIsAuthenticated(false);
              history.push("/");
              props.setOpen(false);
              return;
            }
          }}
        >
          <span className="icon-button"> {leftIcon}</span>
          {children}

          <span className="icon-right"> {rightIcon}</span>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          unmountOnExit
          timeout={250}
          onEnter={(el) => calcHeight(el)}
          classNames="menu-primary"
        >
          <div className="menu">
            {!isAuthenticated && (
              <React.Fragment>
                <DropDownMenuItem to="/login" leftIcon={<HowToReg />}>
                  Giriş Yap
                </DropDownMenuItem>
                <DropDownMenuItem to="/register" leftIcon={<AccountCircle />}>
                  Hesap Oluştur
                </DropDownMenuItem>
              </React.Fragment>
            )}
            {isAuthenticated && user ? (
              <React.Fragment>
                <DropDownMenuItem leftIcon={<Face />} name>
                  <div className="info">
                    <h1>{user.userName}</h1>
                    <p>
                      {user.role === "reader"
                        ? "Okuyucu"
                        : user.role === "editor"
                        ? "Editör"
                        : user.role === "admin"
                        ? "Yönetici"
                        : "Süper Yönetici"}
                    </p>
                  </div>
                </DropDownMenuItem>
                {["super-admin", "admin", "editor"].includes(user.role) && (
                  <DropDownMenuItem leftIcon={<Edit />} to="/editor">
                    Editör Paneli
                  </DropDownMenuItem>
                )}
                {["super-admin", "admin"].includes(user.role) && (
                  <DropDownMenuItem leftIcon={<Dashboard />} to="/admin">
                    Yönetici Paneli
                  </DropDownMenuItem>
                )}
                <DropDownMenuItem to="/bookmarked" leftIcon={<Bookmark />}>
                  Ayracım
                </DropDownMenuItem>
              </React.Fragment>
            ) : null}
            <DropDownMenuItem
              leftIcon={<Category />}
              goToMenu="categories"
              rightIcon={<KeyboardArrowRight />}
            >
              Kategoriler
            </DropDownMenuItem>
            <DropDownMenuItem to="/contact" leftIcon={<Chat />}>
              İletişim
            </DropDownMenuItem>

            {isAuthenticated && user ? (
              <React.Fragment>
                <div className="separator"></div>
                <DropDownMenuItem leftIcon={<MeetingRoom />} logout>
                  Çıkış Yap
                </DropDownMenuItem>
              </React.Fragment>
            ) : null}
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "categories"}
          unmountOnExit
          timeout={250}
          onEnter={(el) => calcHeight(el)}
          classNames="menu-secondary"
        >
          <div className="menu">
            <DropDownMenuItem goToMenu="main" rightIcon={<KeyboardArrowLeft />}>
              Geri
            </DropDownMenuItem>
            <div className="separator"></div>
            {categories.map((category) => (
              <DropDownMenuItem
                to={`/category/${category.path}`}
                leftIcon={category.icon}
              >
                {category.name}
              </DropDownMenuItem>
            ))}
            {/* <DropDownMenuItem to="/category/bilim" leftIcon={<Category />}>
              Bilim
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/teknoloji" leftIcon={<Category />}>
              Teknoloji
            </DropDownMenuItem>
            <DropDownMenuItem
              to="/category/sinema-dizi"
              leftIcon={<Category />}
            >
              Sinema & Dizi
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/oyun" leftIcon={<Category />}>
              Oyun
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/yasam" leftIcon={<Category />}>
              Yaşam
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/tarih" leftIcon={<Category />}>
              Tarih
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/eglence" leftIcon={<Category />}>
              Eğlence
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/edebiyat" leftIcon={<Category />}>
              Edebiyat
            </DropDownMenuItem>
            <DropDownMenuItem to="/category/muzik" leftIcon={<Category />}>
              Müzik
            </DropDownMenuItem>
            <DropDownMenuItem
              to="/category/guncel-olaylar"
              leftIcon={<Category />}
            >
              Güncel Olaylar
            </DropDownMenuItem> */}
          </div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
