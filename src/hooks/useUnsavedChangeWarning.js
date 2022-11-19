import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function useUnsavedChangeWarning(
  message = "Are you sure want to discard change?"
) {
  const [isDirty, setDirty] = useState(false);
  useEffect(() => {
    // Detecting browser closing
    window.onbeforeunload = isDirty && (() => message);

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  return [() => setDirty(true), () => setDirty(false)];
}

useUnsavedChangeWarning.propTypes = {};

export default useUnsavedChangeWarning;
