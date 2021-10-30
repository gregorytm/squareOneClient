import { useState, useEffect } from "react";

/**custom hook for keepsing stat datat synced with local storage
 *
 * this create item as state and looks in localStorage for current value
 * if none are found, defaults to `firstValue`)
 *
 * when item changes, effect re runs;
 * if new state is null removes from localStorage
 * else updates localStorage
 */

function useLocalStorage(key, firstValue = null) {
  const initalValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initalValue);

  useEffect(
    function setKeyInLocalStorage() {
      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;
