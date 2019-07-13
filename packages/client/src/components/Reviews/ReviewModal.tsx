import { Form, Input, Modal, Select, Typography } from "antd";

import React from "react";

import ReviewsContext from "../../contexts/Reviews";
import useStateContext from "../../hooks/useStateContext";

interface Props {
  onSubmit: () => void;
}

const ReviewModal: React.FC<Props> = ({ onSubmit }) => {
  const { dispatch, state } = useStateContext(ReviewsContext);

  if (!state.reviewModal) {
    return null;
  }

  return (
    <Modal
      title={`${
        state.reviewModal.mode === "create" ? "Create" : "Edit"
      } review`}
      visible={true}
      onOk={() => onSubmit()}
      onCancel={() => dispatch({ type: "closeReviewModal" })}
    >
      <Form>
        <Form.Item>
          <Input.TextArea
            onChange={event =>
              dispatch({
                payload: { key: "content", value: event.currentTarget.value },
                type: "setModalValue",
              })
            }
            placeholder="Content*"
            required
            rows={5}
            value={state.reviewModal.form.content}
          />
        </Form.Item>
        {state.reviewModal.mode === "edit" ? null : (
          <Form.Item>
            <Select<number>
              showSearch
              style={{ width: 200 }}
              placeholder="About"
              optionFilterProp="children"
              onChange={index => {
                dispatch({
                  payload: { key: "targetId", value: index },
                  type: "setModalValue",
                });
              }}
              filterOption={(input, option) =>
                Boolean(
                  option.props.children &&
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0,
                )
              }
            >
              {state.employees.map(employee => (
                <Select.Option key={employee.id} value={employee.id}>
                  {employee.lastName} {employee.firstName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Typography.Text>* required field</Typography.Text>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
