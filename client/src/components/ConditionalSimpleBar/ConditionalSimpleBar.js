import { lazy, Suspense } from "react";
import { useCurrentWidth } from "../../hooks";

const SimpleBar = lazy(() => import("simplebar-react"));
const ConditionalStyle = lazy(() => import("./ConditionalStyle"));
const Preloader = lazy(() => import("../Preloader/Preloader"));

const ConditionalSimpleBar = ({
  scrollToTop,
  height = "100vh",
  children,
  overflowY = "auto",
}) => {
  const [width] = useCurrentWidth();

  return width > 600 ? (
    <Suspense fallback={<Preloader />}>
      <ConditionalStyle />
      <SimpleBar style={{ height, overflowX: "hidden", overflowY }}>
        {children}
      </SimpleBar>
    </Suspense>
  ) : (
    <div style={{ height, overflowX: "hidden", overflowY }}>{children}</div>
  );
};

export default ConditionalSimpleBar;
