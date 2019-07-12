import { Breadcrumb, Icon, Layout as AntLayout, Menu } from "antd";
import React from "react";
import {
  Link,
  NotFoundBoundary,
  useCurrentRoute,
  useNavigation,
} from "react-navi";

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
      <AntLayout.Header>
        <Link href="/">
          <h1 className={styles.title}>Feedbacks</h1>
        </Link>
      </AntLayout.Header>
      <AntLayout>
        <AntLayout.Sider width={200}>
          <Menu
            className={styles.menu}
            mode="inline"
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
          </Menu>
        </AntLayout.Sider>
        <AntLayout className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
