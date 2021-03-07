import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Flag from "../../assets/img/turkish_flag.svg";
import { motion } from "framer-motion";
import "./Footer.scss";
import {
  AccountCircle,
  Edit,
  HowToReg,
  Instagram,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import DownloadAppButton from "../DownloadAppButton/DownloadAppButton";
import { AuthContext } from "../../contexts/AuthContext";
import tapping from "../../animations/tapping";
import EditorServices from "../../services/EditorServices";
import AuthServices from "../../services/AuthServices";
import { useMutation, useQueryClient } from "react-query";
import { CircularProgress } from "@material-ui/core";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useContext(
    AuthContext
  );
  const location = useLocation();
  const history = useHistory();
  const date = new Date();

  const queryClient = useQueryClient();

  const { mutateAsync: promoteToEditor, isLoading } = useMutation(
    EditorServices.promoteToEditor,
    {
      onSettled: () => {
        queryClient.invalidateQueries("auth");
        history.push({
          pathname: "/editor",
          state: { from: location.pathname },
        });
      },
    }
  );

  return (
    <footer className={`footer ${theme}`}>
      <section>
        <main>
          <aside>
            <article className="info">
              <h4>CONSOLE nedir?</h4>
              <p>
                <span>CONSOLE</span>, aklına gelebilecek her konuda yazılar
                bulup onlarla etkileşime geçebileceğin, bunu yanında senin de
                bazı şeyler paylaşıp yayınlayabileceğin bir platformdur.
                {!isAuthenticated &&
                  " Sen de yazıları beğenip onlara yorum yapabilmek, hatta bir editör olup yazı yazabilmek için giriş yap."}
                {isAuthenticated &&
                  user.role === "reader" &&
                  " Yazı yazıp insanlara ulaşmak için editör olabilirsin."}
              </p>
              {!isAuthenticated && (
                <div className="controllers">
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: location.pathname },
                    }}
                  >
                    <motion.button whileTap={tapping}>
                      <HowToReg />
                      <span>Giriş Yap</span>
                    </motion.button>
                  </Link>
                  <span>veya</span>
                  <Link
                    to={{
                      pathname: "/register",
                      state: { from: location.pathname },
                    }}
                  >
                    <motion.button whileTap={tapping}>
                      <AccountCircle />
                      <span>Hesap Oluştur</span>
                    </motion.button>
                  </Link>
                </div>
              )}
              {isAuthenticated && user.role === "reader" && (
                <div className="controllers">
                  <motion.button onClick={promoteToEditor} whileTap={tapping}>
                    <Edit />
                    <span>
                      {isLoading ? (
                        <>
                          <CircularProgress
                            style={{
                              width: "1rem",
                              height: "1rem",
                              marginRight: ".5rem",
                              color: "#ff9900",
                            }}
                          />
                          Yükleniyor...
                        </>
                      ) : (
                        "Editör Ol"
                      )}
                    </span>
                  </motion.button>
                </div>
              )}
            </article>
            <article className="links">
              <Link to={{ pathname: "/", state: { from: location.pathname } }}>
                <p>Ana Sayfa</p>
              </Link>

              {!isAuthenticated && (
                <>
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: location.pathname },
                    }}
                  >
                    <p>Giriş Yap</p>
                  </Link>
                  <Link
                    to={{
                      pathname: "/register",
                      state: { from: location.pathname },
                    }}
                  >
                    <p>Hesap Oluştur</p>
                  </Link>
                </>
              )}

              {isAuthenticated && user && (
                <>
                  <Link
                    to={{
                      pathname: "/bookmarked",
                      state: { from: location.pathname },
                    }}
                  >
                    <p>Ayracım</p>
                  </Link>

                  {user.role === "reader" && (
                    <p onClick={promoteToEditor}>Editör ol</p>
                  )}

                  {["editor", "admin", "super-admin"].includes(user.role) && (
                    <Link
                      to={{
                        pathname: "/editor",
                        state: { from: location.pathname },
                      }}
                    >
                      <p>Editör Paneli</p>
                    </Link>
                  )}

                  {["admin", "super-admin"].includes(user.role) && (
                    <Link
                      to={{
                        pathname: "/admin",
                        state: { from: location.pathname },
                      }}
                    >
                      <p>Admin Paneli</p>
                    </Link>
                  )}
                </>
              )}
              <Link
                to={{
                  pathname: "/contact",
                  state: { from: location.pathname },
                }}
              >
                <p>İletişim</p>
              </Link>
              {isAuthenticated && (
                <>
                  <div className="separator"></div>
                  <p
                    onClick={async () => {
                      await AuthServices.logout();
                      setUser({ userName: "", email: "", role: "" });
                      setIsAuthenticated(false);
                      history.push("/");
                    }}
                  >
                    Çıkış Yap
                  </p>
                </>
              )}
            </article>
          </aside>
          <aside>
            <div className="social">
              <h4>Sosyal</h4>
              <div className="icons">
                <Instagram />
                <YouTube />
                <Twitter />
              </div>
            </div>
            <div className="app">
              <h4>Çok yakında</h4>
              <DownloadAppButton platform="app-store" />
              <span></span>
              <DownloadAppButton platform="play-store" />
            </div>
          </aside>
        </main>
        <div className="horizontal-separator"></div>
        <aside>
          <div>
            <img src={Flag} />
            <p>Türkiye</p>
            <span>
              &copy; {date.getFullYear()} Xenoverse, Tüm hakları saklıdır.
            </span>
          </div>
          <div>
            <h6>Kullanım Koşulları</h6>
            <h6>Gizlilik & Çerez Sözleşmesi</h6>
            <h6>Çerez Ayarları</h6>
          </div>
        </aside>
      </section>
    </footer>
  );
};

export default Footer;
