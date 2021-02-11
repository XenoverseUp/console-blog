import { Search } from "@material-ui/icons";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./MobileSearch.scss";

const MobileSearch = () => {
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`mobile-search ${theme}`}>
      <h2>
        Ne okumak <br /> istersin?
      </h2>

      <div className="mobile-search-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Yazıları ara..." />
          <button type="submit">
            <Search />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileSearch;
