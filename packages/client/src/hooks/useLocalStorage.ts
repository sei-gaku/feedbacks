import { useState } from "react";

export default (key: string) => {
  const [value, setValue] = useState(window.localStorage.getItem(key));

  const setStorageValue = (newValue: string) => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };

  const clearStorageValue = () => {
    setValue(null);
    window.localStorage.clear();
  };

  return { clearStorageValue, setStorageValue, storageValue: value };
};
