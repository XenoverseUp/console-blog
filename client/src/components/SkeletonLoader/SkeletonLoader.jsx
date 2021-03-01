import { useContext } from "react";
import { Skeleton } from "@material-ui/lab";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./SkeletonLoader.scss";

const SkeletonLoader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`skeleton-wrapper ${theme}`}>
      <div className="left">
        <Skeleton
          animation="wave"
          variant="circle"
          width="5rem"
          height="5rem"
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="4rem"
          style={{ marginTop: ".5rem" }}
        />
      </div>
      <div className="right">
        <div className="main-content">
          <div className="cover">
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="100%"
              style={{ borderRadius: ".9rem" }}
            />
          </div>
          <div className="content">
            <header>
              <Skeleton
                animation="wave"
                variant="text"
                height="3rem"
                width="90%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                style={{ marginTop: ".5rem" }}
                height="1.5rem"
                width="95%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="95%"
                height="1.5rem"
              />
            </header>
            <main>
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                style={{ marginTop: "1.2rem" }}
              />
              <Skeleton animation="wave" variant="text" width="40%" />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
