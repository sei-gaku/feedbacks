import { Icon, Layout as AntLayout, Menu } from "antd";
import React from "react";
import { NotFoundBoundary, useCurrentRoute, useNavigation } from "react-navi";

import Header from "./Header";

import styles from "./Layout.module.scss";

const renderNotFound = () => (
  <div>
    <h1>404 - Not Found</h1>
  </div>
);

const Layout: React.FC = ({ children }) => {
  const navigation = useNavigation();
  const {
    url: { pathname },
  } = useCurrentRoute();

  return (
    <AntLayout className={styles.root}>
      <Header />
      <AntLayout>
        <AntLayout.Sider width={200}>
          <Menu
            className={styles.menu}
            mode="vertical"
            defaultSelectedKeys={[
              // TODO: Create a smart module that will map keys to pathname, etc...
              pathname === "/employees"
                ? "1"
                : pathname === "/reviews/written-by-me"
                ? "2"
                : pathname === "/reviews/about-me"
                ? "3"
                : "",
            ]}
            theme="dark"
          >
            <Menu.Item
              key="1"
              onClick={() => navigation.navigate("/employees")}
            >
              Employees
            </Menu.Item>
            <Menu.SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="form" />
                  Reviews
                </span>
              }
            >
              <Menu.Item
                key="2"
                onClick={() => navigation.navigate("/reviews/written-by-me")}
              >
                Written by me
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => navigation.navigate("/reviews/about-me")}
              >
                About me
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  Feedbacks
                </span>
              }
            ></Menu.SubMenu>
            <Menu.Item key="4" onClick={() => navigation.navigate("/logout")}>
              Logout
            </Menu.Item>
          </Menu>
        </AntLayout.Sider>
        <AntLayout className={styles.content}>
          <AntLayout.Content
            style={{
              background: "#fff",
              margin: 0,
              minHeight: 280,
              padding: 24,
            }}
          >
            <NotFoundBoundary render={renderNotFound}>
              {children}
            </NotFoundBoundary>
          </AntLayout.Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
