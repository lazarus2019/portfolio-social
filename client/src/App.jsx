import { BrowserRouter } from "react-router-dom";
import GoToTop from "./components/GoToTop/GoToTop";
import Router from "./routes/Router";
import "./scss/_index.scss";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <GoToTop/>
    </BrowserRouter>
  );
}

export default App;
