import React from "react";
import { useNavigation } from "react-navi";

import useLocalStorage from "../hooks/useLocalStorage";
import useNotification from "../hooks/useNotification";

const Logout: React.FC = () => {
  // TODO: Key should be in a config file
  const { clearStorageValue } = useLocalStorage("token");
  const navigation = useNavigation();
  const notify = useNotification();

  React.useEffect(() => {
    clearStorageValue();
    notify("success", "You are now disconnected");
    navigation.navigate("/login");
  }, []);

  return null;
};

export default Logout;
