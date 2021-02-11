import { lazy, Suspense } from "react";
import { useCurrentWidth } from "../hooks";
import Preloader from "./Preloader/Preloader";

const MobileNavBar = lazy(() => import("./MobileNavBar/MobileNavBar"));
const NavBar = lazy(() => import("./NavBar/NavBar"));

const ResponsiveNavBar = () => {
  const [width] = useCurrentWidth();

  return (
    <Suspense fallback={<Preloader />}>
      {width > 600 ? <NavBar /> : <MobileNavBar />}
    </Suspense>
  );
};

export default ResponsiveNavBar;
