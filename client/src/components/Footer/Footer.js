import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Flag from "../../assets/img/turkish_flag.svg";

import "./Footer.scss";
import { Instagram, Twitter, YouTube } from "@material-ui/icons";
import DownloadAppButton from "../DownloadAppButton/DownloadAppButton";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const date = new Date();

  return (
    <footer className={`footer ${theme}`}>
      <section>
        <main>
          <aside></aside>
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
              <span>veya</span>
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
