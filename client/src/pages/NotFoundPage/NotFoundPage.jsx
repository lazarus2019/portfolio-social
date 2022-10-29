import classNames from "classnames/bind";
import styles from "./NotFoundPage.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import Header from "@/components/Header/Header";
import NotFound from "@/components/NotFound/NotFound";
import Footer from "@/components/Footer/Footer";

function NotFoundPage(props) {
  return (
    <>
      <Header hasBg={true} />
      <NotFound />
      <div className="separate p-15"></div>
      <Footer />
    </>
  );
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
