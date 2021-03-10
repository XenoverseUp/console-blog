import { lazy, Suspense, useContext, useEffect } from "react";
import useCleanupCallback from "use-cleanup-callback";
import { ScrollContext } from "../../contexts/ScrollContext";
const SimpleBar = lazy(() => import("simplebar-react"));
const ConditionalStyle = lazy(() => import("./ConditionalStyle"));
const Preloader = lazy(() => import("../Preloader/Preloader"));

const ConditionalSimpleBar = ({
  height = "100vh",
  children,
  overflowY = "auto",
  identity,
}) => {
  const mediaQuery = matchMedia("(max-width: 600px)");
  const { state, setState } = useContext(ScrollContext);

  let tempRef;

  const ref = useCleanupCallback((node) => {
    tempRef = node;
    return () => {
      if (node && identity) setState({ ...state, [identity]: node.scrollTop });
    };
  }, []);

  useEffect(() => {
    tempRef?.scrollTo(0, state[identity] || 0);
  }, [tempRef]);

  return !mediaQuery.matches ? (
    <Suspense fallback={<Preloader />}>
      <ConditionalStyle />
      <SimpleBar
        scrollableNodeProps={{ ref }}
        style={{ height, overflowX: "hidden", overflowY }}
      >
        {children}
      </SimpleBar>
    </Suspense>
  ) : (
    <div ref={ref} style={{ height, overflowX: "hidden", overflowY }}>
      {children}
    </div>
  );
};

export default ConditionalSimpleBar;
