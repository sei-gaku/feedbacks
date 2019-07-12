import Title from "antd/lib/typography/Title";
import React from "react";
import { useCurrentRoute } from "react-navi";

const Reviews: React.FC = () => {
  const route = useCurrentRoute();

  return <Title>Reviews on {route.url.pathname}</Title>;
};

export default Reviews;
