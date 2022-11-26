import classNames from "classnames/bind";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Loading from "components/Loading/Loading";
import SearchResult from "components/SearchResult/SearchResult";
import SearchSidebar from "components/SearchSidebar/SearchSidebar";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.scss";

const cx = classNames.bind(styles);

function SearchPage(props) {
  const [searchParams] = useSearchParams();
  const searchQuery = useMemo(() => {
    return searchParams.get("q");
  }, [searchParams.get("q")]);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    projectCount: 0,
    userCount: 0,
    tagCount: 0,
  });

  return (
    <>
      <Header hasBg={true} searchQuery={searchQuery} />
      <div className="container tight">
        {loading ? (
          <Loading fullHeight />
        ) : (
          <div className={cx("search-container")}>
            <SearchSidebar result={result} />
            <div className={cx("search-container__content")}>
              <SearchResult searchQuery={searchQuery} />
            </div>
          </div>
        )}
      </div>
      <div className="container p-15">
        <div className="separate"></div>
      </div>
      <Footer />
    </>
  );
}

SearchPage.propTypes = {};

export default SearchPage;
