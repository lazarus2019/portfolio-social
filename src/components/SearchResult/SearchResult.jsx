import classNames from "classnames/bind";
import Empty from "components/Empty/Empty";
import styles from "./SearchResult.module.scss";
import SearchResultHeader from "./SearchResultHeader";

const cx = classNames.bind(styles);

function SearchResult(props) {
  const { searchQuery, tab = "user", result } = props;
  const list = [{}, {}];
  return (
    <div>
      {list.length > 0 ? (
        <>
          <SearchResultHeader resultAmount={list.length} tab={tab} />
        </>
      ) : (
        <Empty
          desc={`We couldn’t find any records matching '${searchQuery}'`}
        />
      )}
    </div>
  );
}

SearchResult.propTypes = {};

export default SearchResult;
