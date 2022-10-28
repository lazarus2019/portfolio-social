import { BrowserRouter } from "react-router-dom";
import GoToTop from "./components/GoToTop/GoToTop";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/_index.scss";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <GoToTop />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
