import Footer from "@/components/Footer/Footer";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import NewProjectSection from "@/components/Sections/NewestProjectSection/NewProjectSection";
import PopularSection from "@/components/Sections/PopularSection/PopularSection";
import RouteSection from "@/components/Sections/RouteSection/RouteSection";
import ServicesSection from "@/components/Sections/ServicesSection/ServicesSection";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("head", "section")}>
        <HomeHeader />
      </div>
      <div className={cx("container")}>
        <ServicesSection />
      </div>
      <PopularSection />
      <RouteSection />
      <NewProjectSection />
      <Footer />
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
