import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import "./scss/_index.scss";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
