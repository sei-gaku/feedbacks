import { notification } from "antd";

export default () => (
  type: "success" | "error" | "warn" | "info",
  message: string,
  description?: string,
) => {
  notification[type]({
    description,
    message,
  });
};
