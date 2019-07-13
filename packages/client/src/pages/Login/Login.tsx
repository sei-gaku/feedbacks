import { Card, Col, Layout, Row } from "antd";
import { useMutation } from "graphql-hooks";
import { loader } from "graphql.macro";
import React from "react";
import { useNavigation } from "react-navi";

import Header from "../../components/Header";
import LoginForm from "../../components/Login/Form";
import LoginContext from "../../contexts/Login";
import { LoginMutation } from "../../generated/graphql";
import useNotification from "../../hooks/useNotification";
import useStateContext from "../../hooks/useStateContext";

import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "./Login.module.scss";

const loginMutation = loader("./Login.graphql").loc!.source.body;

const Login: React.FC = () => {
  const { dispatch, state } = useStateContext(LoginContext);
  const [login, response] = useMutation<LoginMutation>(loginMutation);
  const notify = useNotification();
  const navigation = useNavigation();
  const { setStorageValue: setTokenStorageValue } = useLocalStorage("token");
  const { setStorageValue: setRoleStorageValue } = useLocalStorage("role");
  const { setStorageValue: setIdStorageValue } = useLocalStorage("id");

  React.useEffect(() => {
    dispatch({ type: "setLoading", payload: response.loading });

    if (response.error) {
      notify("error", "An error occured, please check your credentials again");

      return;
    }

    if (response.data && !response.loading) {
      notify("success", "Login success");
      navigation.navigate("/");
      setTokenStorageValue(response.data.login.token);
      setRoleStorageValue(response.data.login.isAdmin ? "admin" : "employee");
      setIdStorageValue(response.data.login.id.toString());

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data, response.loading, response.error]);

  return (
    <Layout className={styles.root}>
      <Header />
      <Layout>
        <Row type="flex" justify="center">
          <Col xs={0} md={12}></Col>
          <Col xs={24} md={12}>
            <Row type="flex" justify="center">
              <Card className={styles.panel} title="Login">
                <LoginForm
                  onSubmit={event => {
                    event.preventDefault();
                    login({
                      variables: {
                        email: state.form.email,
                        password: state.form.password,
                      },
                    });
                  }}
                />
              </Card>
            </Row>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Login;
