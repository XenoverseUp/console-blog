import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Router from "./Router";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Router />
    </div>
  );
}

export default App;
