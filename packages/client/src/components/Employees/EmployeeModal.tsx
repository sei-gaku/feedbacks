import { Col, Form, Icon, Input, Modal, Row, Switch, Typography } from "antd";

import React from "react";

import EmployeesContext from "../../contexts/Employees";
import useStateContext from "../../hooks/useStateContext";

interface Props {
  onSubmit: () => void;
}

const EmployeeModal: React.FC<Props> = ({ onSubmit }) => {
  const { dispatch, state } = useStateContext(EmployeesContext);

  if (!state.employeeModal) {
    return null;
  }

  return (
    <Modal
      title={`${
        state.employeeModal.mode === "create" ? "Create" : "Edit"
      } employee`}
      visible={true}
      onOk={() => onSubmit()}
      onCancel={() => dispatch({ type: "closeEmployeeModal" })}
    >
      <Form>
        <Form.Item>
          <Input
            disabled={state.employeeModal.mode === "edit"}
            onChange={event =>
              dispatch({
                payload: { key: "email", value: event.currentTarget.value },
                type: "setModalValue",
              })
            }
            placeholder="Email*"
            required
            size="large"
            type="email"
            value={state.employeeModal.form.email}
          />
        </Form.Item>
        {state.employeeModal.mode === "edit" ? null : (
          <Form.Item>
            <Input
              onChange={event =>
                dispatch({
                  payload: {
                    key: "password",
                    value: event.currentTarget.value,
                  },
                  type: "setModalValue",
                })
              }
              placeholder="Password*"
              required
              size="large"
              type="password"
              value={state.employeeModal.form.password}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Input
            onChange={event =>
              dispatch({
                payload: { key: "firstName", value: event.currentTarget.value },
                type: "setModalValue",
              })
            }
            placeholder="First Name*"
            required
            size="large"
            value={state.employeeModal.form.firstName}
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={event =>
              dispatch({
                payload: { key: "lastName", value: event.currentTarget.value },
                type: "setModalValue",
              })
            }
            placeholder="Last Name*"
            required
            size="large"
            value={state.employeeModal.form.lastName}
          />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            onChange={event =>
              dispatch({
                payload: { key: "bio", value: event.currentTarget.value },
                type: "setModalValue",
              })
            }
            placeholder="Bio"
            rows={5}
            value={state.employeeModal.form.bio || ""}
          />
        </Form.Item>
        <Form.Item>
          <Row gutter={8} type="flex" align="middle">
            <Col>
              <Typography.Text>Admin</Typography.Text>
            </Col>
            <Col>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked
                checked={state.employeeModal.form.isAdmin}
                onChange={newValue => {
                  dispatch({
                    payload: { key: "isAdmin", value: newValue },
                    type: "setModalValue",
                  });
                }}
              />
            </Col>
          </Row>
        </Form.Item>
        <Typography.Text>* required field</Typography.Text>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;
