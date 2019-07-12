import Title from "antd/lib/typography/Title";
import React from "react";
import { useCurrentRoute } from "react-navi";

import Layout from "../components/Layout";

const Reviews: React.FC = () => {
  const route = useCurrentRoute();

  return (
    <Layout>
      <Title>Reviews on {route.url.pathname}</Title>
    </Layout>
  );
};

export default Reviews;
