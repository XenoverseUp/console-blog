import { useContext, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import "./CommentPoster.scss";

const Form = lazy(() => import("./Form"));

const CommentPoster = ({ setNewComments, setDrawerState, newComments, id }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const location = useLocation();

  return !isAuthenticated ? (
    <div className={`comment-poster not-authenticated`}>
      <p>Bu yazı hakkında ne düşünüyorsun?</p>
      <Link
        className="link"
        onClick={() => setDrawerState(false)}
        to={{ pathname: "/login", state: { from: location.pathname } }}
      >
        Giriş Yap
      </Link>
    </div>
  ) : (
    <Suspense fallback={"Loading..."}>
      <Form id={id} setNewComments={setNewComments} newComments={newComments} />
    </Suspense>
  );
};

export default CommentPoster;
