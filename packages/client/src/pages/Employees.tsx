import Title from "antd/lib/typography/Title";
import React from "react";
import { useCurrentRoute } from "react-navi";

import Layout from "../components/Layout";

const Employees: React.FC = () => {
  const route = useCurrentRoute();

  return (
    <Layout>
      <Title>Employees on {route.url.pathname}</Title>
    </Layout>
  );
};

export default Employees;
