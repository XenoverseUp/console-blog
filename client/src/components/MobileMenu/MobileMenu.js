import {
  AccountCircle,
  BookmarkRounded,
  Category,
  Chat,
  Dashboard,
  EditRounded,
  HowToReg,
  MeetingRoom,
  KeyboardArrowRightRounded,
  AllInclusive,
  KeyboardArrowLeft,
} from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, Suspense, useEffect, useState, Children } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Drawer } from "..";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./MobileMenu.scss";
import MobileMenuButton from "./MobileMenuButton/MobileMenuButton";
import AuthServices from "../../services/AuthServices";
import { CategoryContext } from "../../contexts/CategoryContext";
import menuVariants from "../../animations/menuVariants";
import { useCurrentWidth } from "../../hooks";

const MobileMenu = ({ IMG, isOpen, setIsOpen }) => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useContext(
    AuthContext
  );
  const { theme } = useContext(ThemeContext);
  const categories = useContext(CategoryContext);
  const location = useLocation();
  const history = useHistory();

  const [activeMenu, setActiveMenu] = useState("main");

  useEffect(() => !isOpen && setActiveMenu("main"), [isOpen]);

  return (
    <Drawer padding={false} open={isOpen} setOpen={setIsOpen}>
      <div className={`mobile-menu ${theme}`}>
        <header>
          <div className="logo-container">
            <AllInclusive />
          </div>
          <h2>CONSOLE</h2>
        </header>
        <div className="separator"></div>
        {isAuthenticated ? (
          <div className="user-info">
            <div className="avatar">
              <Suspense>
                <IMG />
              </Suspense>
            </div>
            <div className="user">
              <p>{user.userName}</p>
              <span>
                {user.role === "reader"
                  ? "Okuyucu"
                  : user.role === "editor"
                  ? "Editör"
                  : user.role === "admin"
                  ? "Yönetici"
                  : "Süper Yönetici"}
              </span>
            </div>
          </div>
        ) : (
          <div className="user-info">
            <div className="avatar">
              <IMG />
            </div>
            <div className="user">
              <p className="n">
                Hemen bir hesap oluştur ve bütün özellikleri aç.
              </p>
            </div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {activeMenu === "main" && (
            <motion.main
              initial="initial"
              animate="visible"
              exit="exit"
              key="nm"
              variants={menuVariants("main")}
            >
              {!isAuthenticated && (
                <>
                  <MobileMenuButton
                    link="/login"
                    title="Giriş Yap"
                    leftIcon={<HowToReg />}
                    setIsOpen={setIsOpen}
                  />
                  <MobileMenuButton
                    link="/register"
                    title="Hesap Oluştur"
                    leftIcon={<AccountCircle />}
                    setIsOpen={setIsOpen}
                  />
                </>
              )}

              {isAuthenticated &&
                ["editor", "admin", "super-admin"].includes(user.role) && (
                  <MobileMenuButton
                    link="/editor"
                    title="Editör Paneli"
                    leftIcon={<EditRounded />}
                    setIsOpen={setIsOpen}
                  />
                )}

              {isAuthenticated &&
                ["admin", "super-admin"].includes(user.role) && (
                  <MobileMenuButton
                    link="/admin"
                    title="Admin Paneli"
                    leftIcon={<Dashboard />}
                    setIsOpen={setIsOpen}
                  />
                )}

              {isAuthenticated && user && (
                <MobileMenuButton
                  link="/bookmarked"
                  title="Ayracım"
                  leftIcon={<BookmarkRounded />}
                  setIsOpen={setIsOpen}
                />
              )}

              <MobileMenuButton
                title="Kategoriler"
                leftIcon={<Category />}
                rightIcon={<KeyboardArrowRightRounded />}
                action={() => setActiveMenu("categories")}
              />

              <MobileMenuButton
                link="/contact"
                title="İletişim"
                leftIcon={<Chat />}
                setIsOpen={setIsOpen}
              />

              {isAuthenticated && user && (
                <>
                  <div className="separator"></div>
                  <MobileMenuButton
                    title="Çıkış Yap"
                    leftIcon={<MeetingRoom />}
                    action={async () => {
                      await AuthServices.logout();
                      setUser({ userName: "", email: "", role: "" });
                      setIsAuthenticated(false);
                      history.push("/");
                      setIsOpen(false);
                    }}
                  />
                </>
              )}
            </motion.main>
          )}
          {activeMenu === "categories" && (
            <motion.main
              initial="initial"
              animate="visible"
              exit="exit"
              key="mn"
              variants={menuVariants("categories")}
            >
              <MobileMenuButton
                title="Geri"
                rightIcon={<KeyboardArrowLeft />}
                action={() => setActiveMenu("main")}
              />
              {Children.toArray(
                categories.map((category, i) => (
                  <MobileMenuButton
                    title={category.name}
                    leftIcon={category.icon}
                    link={`/category/${category.path}`}
                    setIsOpen={setIsOpen}
                  />
                ))
              )}
            </motion.main>
          )}
        </AnimatePresence>
        <footer>Xenoverse {new Date().getFullYear()} &copy;</footer>
      </div>
    </Drawer>
  );
};

export default MobileMenu;
