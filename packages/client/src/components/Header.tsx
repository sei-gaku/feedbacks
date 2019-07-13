import { Layout } from "antd";
import React from "react";
import { Link } from "react-navi";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <Layout.Header>
      <Link href="/">
        <h1 className={styles.title}>Feedbacks</h1>
      </Link>
    </Layout.Header>
  );
};

export default Header;
