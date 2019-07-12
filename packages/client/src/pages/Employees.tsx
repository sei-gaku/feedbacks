import Title from "antd/lib/typography/Title";
import React from "react";
import { useCurrentRoute } from "react-navi";

const Employees: React.FC = () => {
  const route = useCurrentRoute();

  return <Title>Employees on {route.url.pathname}</Title>;
};

export default Employees;
