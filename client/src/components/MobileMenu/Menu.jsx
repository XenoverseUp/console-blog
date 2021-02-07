import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CSSTransition } from "react-transition-group";
import { useHistory, Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { useCurrentWidth } from "../../hooks";
import {
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
  HomeRounded,
} from "@material-ui/icons";

const Menu = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const history = useHistory();

  const currentHeight = useCurrentWidth()[1];

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
  }) => {
    if (to) {
      return (
        <Link
          to={to}
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
          className="menu-item"
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
    <>
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        {!isAuthenticated ? (
          <React.Fragment>
            <CSSTransition
              in={activeMenu === "main"}
              unmountOnExit
              timeout={500}
              onEnter={(el) => calcHeight(el)}
              classNames="menu-primary"
            >
              <div className="menu">
                <DropDownMenuItem to="/" leftIcon={<HomeRounded />}>
                  Ana Sayfa
                </DropDownMenuItem>
                <DropDownMenuItem to="/login" leftIcon={<HowToReg />}>
                  Giriş Yap
                </DropDownMenuItem>
                <DropDownMenuItem to="/register" leftIcon={<AccountCircle />}>
                  Hesap Oluştur
                </DropDownMenuItem>
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
              </div>
            </CSSTransition>
            <CSSTransition
              in={activeMenu === "categories"}
              unmountOnExit
              timeout={500}
              onEnter={(el) => calcHeight(el)}
              classNames="menu-secondary"
            >
              <div className="menu sc">
                <DropDownMenuItem
                  goToMenu="main"
                  rightIcon={<KeyboardArrowLeft />}
                >
                  Geri
                </DropDownMenuItem>
                <DropDownMenuItem to="/category/bilim" leftIcon={<Category />}>
                  Bilim
                </DropDownMenuItem>
                <DropDownMenuItem
                  to="/category/teknoloji"
                  leftIcon={<Category />}
                >
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
                <DropDownMenuItem to="/category/yaşam" leftIcon={<Category />}>
                  Yaşam
                </DropDownMenuItem>
                <DropDownMenuItem to="/category/tarih" leftIcon={<Category />}>
                  Tarih
                </DropDownMenuItem>
                <DropDownMenuItem
                  to="/category/eglence"
                  leftIcon={<Category />}
                >
                  Eğlence
                </DropDownMenuItem>
                {currentHeight < 750 ? null : (
                  <React.Fragment>
                    <DropDownMenuItem
                      to="/category/edebiyat"
                      leftIcon={<Category />}
                    >
                      Edebiyat
                    </DropDownMenuItem>
                    <DropDownMenuItem
                      to="/category/muzik"
                      leftIcon={<Category />}
                    >
                      Müzik
                    </DropDownMenuItem>
                    <DropDownMenuItem
                      to="/category/guncel-olaylar"
                      leftIcon={<Category />}
                    >
                      Güncel Olaylar
                    </DropDownMenuItem>
                  </React.Fragment>
                )}
              </div>
            </CSSTransition>
          </React.Fragment>
        ) : isAuthenticated && user && user.role === "reader" ? (
          <React.Fragment>
            <CSSTransition
              in={activeMenu === "main"}
              unmountOnExit
              timeout={500}
              classNames="menu-primary"
              onEnter={(el) => calcHeight(el)}
            >
              <div className="menu au">
                <DropDownMenuItem leftIcon={<Face />}>
                  <div className="info">
                    <h1>{user.userName}</h1>
                    <p>Okuyucu</p>
                  </div>
                </DropDownMenuItem>
                <DropDownMenuItem to="/" leftIcon={<HomeRounded />}>
                  Ana Sayfa
                </DropDownMenuItem>
                <DropDownMenuItem to="/bookmarked" leftIcon={<Bookmark />}>
                  Ayracım
                </DropDownMenuItem>
                <DropDownMenuItem
                  leftIcon={<Category />}
                  goToMenu="categories"
                  rightIcon={<KeyboardArrowRight />}
                >
                  Kategoriler
                </DropDownMenuItem>
                <DropDownMenuItem leftIcon={<MeetingRoom />} logout>
                  Çıkış Yap
                </DropDownMenuItem>
              </div>
            </CSSTransition>
            <CSSTransition
              in={activeMenu === "categories"}
              unmountOnExit
              timeout={500}
              onEnter={(el) => calcHeight(el)}
              classNames="menu-secondary"
            >
              <div className="menu sc">
                <DropDownMenuItem
                  goToMenu="main"
                  rightIcon={<KeyboardArrowLeft />}
                >
                  Geri
                </DropDownMenuItem>
                <DropDownMenuItem to="/category/bilim" leftIcon={<Category />}>
                  Bilim
                </DropDownMenuItem>
                <DropDownMenuItem
                  to="/category/teknoloji"
                  leftIcon={<Category />}
                >
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
                <DropDownMenuItem to="/category/yaşam" leftIcon={<Category />}>
                  Yaşam
                </DropDownMenuItem>
                <DropDownMenuItem to="/category/tarih" leftIcon={<Category />}>
                  Tarih
                </DropDownMenuItem>
                <DropDownMenuItem
                  to="/category/eglence"
                  leftIcon={<Category />}
                >
                  Eğlence
                </DropDownMenuItem>
                {currentHeight < 750 ? null : (
                  <React.Fragment>
                    <DropDownMenuItem
                      to="/category/edebiyat"
                      leftIcon={<Category />}
                    >
                      Edebiyat
                    </DropDownMenuItem>
                    <DropDownMenuItem
                      to="/category/muzik"
                      leftIcon={<Category />}
                    >
                      Müzik
                    </DropDownMenuItem>
                    <DropDownMenuItem
                      to="/category/guncel-olaylar"
                      leftIcon={<Category />}
                    >
                      Güncel Olaylar
                    </DropDownMenuItem>
                  </React.Fragment>
                )}
              </div>
            </CSSTransition>
          </React.Fragment>
        ) : isAuthenticated &&
          user &&
          (user.role === "editor" ||
            user.role === "admin" ||
            user.role === "super-admin") ? (
          <React.Fragment>
            <CSSTransition
              in={activeMenu === "main"}
              unmountOnExit
              timeout={500}
              classNames="menu-primary"
              onEnter={(el) => calcHeight(el)}
            >
              <div className="menu au">
                <DropDownMenuItem leftIcon={<Face />}>
                  <div className="info">
                    <h1>{user.userName}</h1>
                    <p>
                      {user.role === "editor"
                        ? "Editör"
                        : user.role === "admin"
                        ? "Yönetici"
                        : "Süper Yönetici"}
                    </p>
                  </div>
                </DropDownMenuItem>
                <DropDownMenuItem to="/" leftIcon={<HomeRounded />}>
                  Ana Sayfa
                </DropDownMenuItem>
                <DropDownMenuItem leftIcon={<Edit />} to="/editor">
                  Editör Paneli
                </DropDownMenuItem>
                {user.role === "admin" || user.role === "super-admin" ? (
                  <DropDownMenuItem leftIcon={<Dashboard />} to="/admin">
                    Yönetici Paneli
                  </DropDownMenuItem>
                ) : null}
                <DropDownMenuItem to="/bookmarked" leftIcon={<Bookmark />}>
                  Ayracım
                </DropDownMenuItem>
                <DropDownMenuItem
                  leftIcon={<Category />}
                  goToMenu="categories"
                  rightIcon={<KeyboardArrowRight />}
                >
                  Kategoriler
                </DropDownMenuItem>
                <DropDownMenuItem leftIcon={<MeetingRoom />} logout>
                  Çıkış Yap
                </DropDownMenuItem>
              </div>
            </CSSTransition>
            <CSSTransition
              in={activeMenu === "categories"}
              unmountOnExit
              timeout={500}
              onEnter={(el) => calcHeight(el)}
              classNames="menu-secondary"
            >
              <div className="menu sc">
                <DropDownMenuItem
                  goToMenu="main"
                  rightIcon={<KeyboardArrowLeft />}
                >
                  Geri
                </DropDownMenuItem>
                <DropDownMenuItem to="/category/bilim" leftIcon={<Category />}>
                  Bilim
                </DropDownMenuItem>
                <DropDownMenuItem
                  to="/category/teknoloji"
                  leftIcon={<Category />}
                >
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
                <DropDownMenuItem to="/category/yaşam" leftIcon={<Category />}>
                  Yaşam
                </DropDownMenuItem>
                <DropDownMenuItem to="/category/tarih" leftIcon={<Category />}>
                  Tarih
                </DropDownMenuItem>
                <DropDownMenuItem
                  to="/category/eglence"
                  leftIcon={<Category />}
                >
                  Eğlence
                </DropDownMenuItem>
                {currentHeight < 750 ? null : (
                  <React.Fragment>
                    <DropDownMenuItem
                      to="/category/edebiyat"
                      leftIcon={<Category />}
                    >
                      Edebiyat
                    </DropDownMenuItem>
                    <DropDownMenuItem
                      to="/category/muzik"
                      leftIcon={<Category />}
                    >
                      Müzik
                    </DropDownMenuItem>
                    <DropDownMenuItem
                      to="/category/guncel-olaylar"
                      leftIcon={<Category />}
                    >
                      Güncel Olaylar
                    </DropDownMenuItem>
                  </React.Fragment>
                )}
              </div>
            </CSSTransition>
          </React.Fragment>
        ) : null}
      </div>
    </>
  );
};

export default Menu;
