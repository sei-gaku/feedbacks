import React from "react";
import { useNavigation } from "react-navi";

import useLocalStorage from "../../hooks/useLocalStorage";
import useNotification from "../../hooks/useNotification";

const Logout: React.FC = () => {
  // TODO: Key should be in a config file
  const { clearStorageValue: clearTokenStorageValue } = useLocalStorage(
    "token",
  );
  const { clearStorageValue: clearRoleStorageValue } = useLocalStorage("role");
  const navigation = useNavigation();
  const notify = useNotification();

  React.useEffect(() => {
    clearTokenStorageValue();
    clearRoleStorageValue();
    notify("success", "You are now disconnected");
    navigation.navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
