import { lazy, Suspense } from "react";
import { useCurrentWidth } from "../hooks";

const MobileNavBar = lazy(() => import("./MobileNavBar/MobileNavBar"));
const NavBar = lazy(() => import("./NavBar/NavBar"));

const ResponsiveNavBar = ({ blogCover, blogTitle }) => {
  const [width] = useCurrentWidth();

  return (
    <Suspense fallback="">
      {width > 600 ? (
        <NavBar />
      ) : (
        <MobileNavBar blogCover={blogCover} blogTitle={blogTitle} />
      )}
    </Suspense>
  );
};

export default ResponsiveNavBar;
