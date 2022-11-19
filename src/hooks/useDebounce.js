import { useState, useEffect } from "react";

function useDebounce(value, delay = 200) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value?.trim());
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return debounceValue;
}

export default useDebounce;
