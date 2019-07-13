import { Modal, Typography } from "antd";

import React from "react";

import EmployeesContext from "../../contexts/Employees";
import useStateContext from "../../hooks/useStateContext";

interface Props {
  onSubmit: () => void;
}

const WarningModal: React.FC<Props> = ({ onSubmit }) => {
  const { dispatch, state } = useStateContext(EmployeesContext);

  if (!state.warningModal) {
    return null;
  }

  return (
    <Modal
      visible={true}
      onOk={() => onSubmit()}
      onCancel={() => dispatch({ type: "closeWarningModal" })}
    >
      <Typography.Text type="danger">Are you sure?</Typography.Text>
    </Modal>
  );
};

export default WarningModal;
