import { Link, useLocation } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import "./RecommendedCard.scss";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const RecommendedCard = ({ data }) => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`recommendation-card ${theme}`}>
      {!data?.title ? (
        <main>
          <Skeleton
            variant="rect"
            style={{ height: "100%", width: "6.3rem", borderRadius: ".7rem" }}
          />
          <div className="content">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton
              variant="text"
              style={{ marginTop: ".5rem", width: "50%", height: ".7rem" }}
            />
          </div>
        </main>
      ) : (
        <Link
          to={{
            pathname: `/blog/${data._id}`,
            state: { from: location.pathname },
          }}
        >
          <main>
            <div
              className="cover"
              style={{
                background: `url("${data.coverImagePath}") no-repeat center / cover`,
              }}
            ></div>
            <div className="content">
              <h5>{data.title}</h5>
              <p>{data.author.userName}</p>
            </div>
          </main>
        </Link>
      )}
    </div>
  );
};

export default RecommendedCard;
