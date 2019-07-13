import { Typography } from "antd";
import React from "react";
import { useCurrentRoute } from "react-navi";

import Layout from "../components/Layout";

const Reviews: React.FC = () => {
  const route = useCurrentRoute();

  return (
    <Layout>
      <Typography.Title>Reviews on {route.url.pathname}</Typography.Title>
    </Layout>
  );
};

export default Reviews;
