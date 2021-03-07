import { Children, cloneElement } from "react";
import "./Recommendeds.scss";

const Recommendeds = ({
  recommendations,

  intersectionRef,
  children,
}) => {
  return (
    <div className={`recommendeds`} ref={intersectionRef}>
      {Children.toArray(children).map((child, i) =>
        cloneElement(child, {
          data: recommendations?.[i],
        })
      )}
    </div>
  );
};

export default Recommendeds;
