import { Button, Form, Icon, Input } from "antd";
import React from "react";

import LoginContext from "../../contexts/Login";
import useStateContext from "../../hooks/useStateContext";

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

// TODO: Add some validations!

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { dispatch, state } = useStateContext(LoginContext);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        <Input
          onChange={event =>
            dispatch({
              payload: event.currentTarget.value,
              type: "setEmailValue",
            })
          }
          prefix={<Icon type="user" />}
          placeholder="Email"
          size="large"
          type="email"
          value={state.form.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          onChange={event =>
            dispatch({
              payload: event.currentTarget.value,
              type: "setPasswordValue",
            })
          }
          prefix={<Icon type="lock" />}
          placeholder="Password"
          size="large"
          type="password"
          value={state.form.password}
        />
      </Form.Item>
      <Form.Item>
        <Button
          icon="login"
          loading={state.loading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
