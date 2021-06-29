import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollToTop from "./scrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Wrapper = ({ children }) => (
  <Router>
    <CssBaseline />
    <ToastContainer autoClose={1500} closeButton={false} hideProgressBar />
    <ScrollToTop>{children}</ScrollToTop>
  </Router>
);
