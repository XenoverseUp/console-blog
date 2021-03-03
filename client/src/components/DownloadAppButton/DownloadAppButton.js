import { Apple } from "@material-ui/icons";
import { ReactComponent as PlayStore } from "../../assets/img/play-store.svg";
import "./DownloadAppButton.scss";

const DownloadAppButton = ({ platform }) => {
  return (
    <div className="download-app">
      <div className="icon">
        {platform === "app-store" ? (
          <Apple style={{ paddingBottom: ".2rem" }} />
        ) : (
          <PlayStore />
        )}
      </div>
      <div className="content">
        <span>Hemen indir</span>
        <p>{platform === "app-store" ? "App Store" : "Google Play"}</p>
      </div>
    </div>
  );
};

export default DownloadAppButton;
