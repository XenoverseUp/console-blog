import { useHistory, useLocation } from "react-router-dom";
import "./MobileMenuButton.scss";

const MobileMenuButton = ({
  leftIcon,
  rightIcon,
  title,
  link,
  action,
  setIsOpen,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div
      className={`mobile-menu-button`}
      onClick={
        link
          ? () => {
              history.push({
                pathname: link,
                state: { from: location.pathname },
              });
              setIsOpen(false);
            }
          : action
          ? () => action()
          : null
      }
    >
      <main>
        <span>{leftIcon}</span>
        <p>{title}</p>
      </main>
      <span>{rightIcon}</span>
    </div>
  );
};

export default MobileMenuButton;
