import { useContext, useEffect } from "react";

import StorageContext from "../contexts/Storage";

export default (key: string) => {
  const initValue = window.localStorage.getItem(key);

  const { dispatch, state } = useContext(StorageContext);

  useEffect(() => {
    if (!initValue) {
      return;
    }

    dispatch({ payload: { key, value: initValue }, type: "setValue" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStorageValue = (newValue: string) => {
    dispatch({ type: "setValue", payload: { key, value: newValue } });
    window.localStorage.setItem(key, newValue);
  };

  const clearStorageValue = () => {
    dispatch({ type: "clearValue", payload: { key } });
    window.localStorage.clear();
  };

  return {
    clearStorageValue,
    setStorageValue,
    storageValue: initValue || state[key],
  };
};
