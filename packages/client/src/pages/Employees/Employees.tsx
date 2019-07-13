import { Button, Dropdown, Icon, Menu, Row, Table, Typography } from "antd";
import { loader } from "graphql.macro";
import React from "react";
import { Link } from "react-navi";

import EmployeeModal from "../../components/Employees/EmployeeModal";
import WarningModal from "../../components/Employees/WarningModal";
import Layout from "../../components/Layout";
import EmployeesContext from "../../contexts/Employees";
import {
  CreateEmployeeMutation,
  DeleteEmployeeMutation,
  EmployeesQuery,
} from "../../generated/graphql";
import useManualQueryWithAuth from "../../hooks/useManualQueryWithAuth";
import useMutationWithAuth from "../../hooks/useMutationWithAuth";
import useNotification from "../../hooks/useNotification";
import useStateContext from "../../hooks/useStateContext";

type Employee = EmployeesQuery["employees"][number];

const fetchEmployeesQuery = loader("./Employees.graphql").loc!.source.body;
const createEmployeeMutation = loader("./CreateEmployee.graphql").loc!.source
  .body;
const updateEmployeeMutation = loader("./UpdateEmployee.graphql").loc!.source
  .body;
const deleteEmployeeMutation = loader("./DeleteEmployee.graphql").loc!.source
  .body;

const Employees: React.FC = () => {
  const [fetchEmployees, employeesFetched] = useManualQueryWithAuth<
    EmployeesQuery
  >(fetchEmployeesQuery);
  const [createEmployee, employeeCreated] = useMutationWithAuth<
    CreateEmployeeMutation
  >(createEmployeeMutation);
  const [updateEmployee, employeeUpdated] = useMutationWithAuth<
    CreateEmployeeMutation
  >(updateEmployeeMutation);
  const [deleteEmployee, employeeDeleted] = useMutationWithAuth<
    DeleteEmployeeMutation
  >(deleteEmployeeMutation);
  const notify = useNotification();
  const { dispatch, state } = useStateContext(EmployeesContext);

  // TODO: Cast unknown to Employee
  const actionsMenu = (employee: Employee) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          dispatch({
            payload: { employeeId: employee.id, mode: "edit", init: employee },
            type: "openEmployeeModal",
          });
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link href={`/reviews/written-by/${employee.id}`}>Written reviews</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href={`/reviews/about/${employee.id}`}>About reviews</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          dispatch({
            payload: { employeeId: employee.id },
            type: "openWarninModal",
          });
        }}
      >
        <Typography.Text type="danger">Delete</Typography.Text>
      </Menu.Item>
    </Menu>
  );

  // Init employees fetch
  React.useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Init employee fetch error
  React.useEffect(() => {
    if (employeesFetched.error) {
      notify("error", "An error occured");
    }
  }, [employeesFetched.error, notify]);

  // Handle the error and success on employee creation
  React.useEffect(() => {
    if (employeeCreated.error) {
      return notify("error", "An error occured");
    }

    if (employeeCreated.data && !employeeCreated.loading) {
      notify("success", "Employee created successfully");
      dispatch({ type: "closeEmployeeModal" });
      fetchEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeCreated.error, employeeCreated.loading, employeeCreated.data]);

  // Handle the error and success on employee update
  React.useEffect(() => {
    if (employeeUpdated.error) {
      return notify("error", "An error occured");
    }

    if (employeeUpdated.data && !employeeUpdated.loading) {
      notify("success", "Employee updated successfully");
      dispatch({ type: "closeEmployeeModal" });
      fetchEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeUpdated.error, employeeUpdated.loading, employeeUpdated.data]);

  // Handle the error and success on employee delete
  React.useEffect(() => {
    if (employeeDeleted.error) {
      return notify("error", "An error occured");
    }

    if (employeeDeleted.data && !employeeDeleted.loading) {
      notify("success", "Employee deleted successfully");
      dispatch({ type: "closeWarningModal" });
      fetchEmployees();

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeDeleted.error, employeeDeleted.loading, employeeDeleted.data]);

  const submitEmployee = React.useCallback(() => {
    if (!state.employeeModal) {
      return notify("error", "An error occured");
    }

    switch (state.employeeModal.mode) {
      case "create": {
        createEmployee({
          variables: {
            bio: state.employeeModal.form.bio,
            email: state.employeeModal.form.email,
            firstName: state.employeeModal.form.firstName,
            isAdmin: state.employeeModal.form.isAdmin,
            lastName: state.employeeModal.form.lastName,
            password: state.employeeModal.form.password,
          },
        });

        return;
      }

      case "edit": {
        if (!state.employeeModal.employeeId) {
          notify("error", "An error occured");

          return;
        }

        updateEmployee({
          variables: {
            bio: state.employeeModal.form.bio,
            firstName: state.employeeModal.form.firstName,
            id: state.employeeModal.employeeId,
            isAdmin: state.employeeModal.form.isAdmin,
            lastName: state.employeeModal.form.lastName,
          },
        });

        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.employeeModal]);

  const submitDeleteEmployee = React.useCallback(() => {
    if (!state.warningModal) {
      return notify("error", "An error occured");
    }

    deleteEmployee({ variables: { id: state.warningModal.employeeId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.warningModal]);

  return (
    <Layout>
      <EmployeeModal onSubmit={submitEmployee} />
      <WarningModal onSubmit={submitDeleteEmployee} />
      <Row type="flex" justify="space-between">
        <Typography.Title>Employees</Typography.Title>
        <Button
          onClick={() =>
            dispatch({ type: "openEmployeeModal", payload: { mode: "create" } })
          }
          type="primary"
          size="large"
        >
          Create Employee
        </Button>
      </Row>
      <Table<Employee>
        dataSource={
          employeesFetched.data
            ? employeesFetched.data.employees.map(employee => ({
                ...employee,
                key: employee.id.toString(),
              }))
            : []
        }
        loading={employeesFetched.loading}
      >
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column
          title="First Name"
          dataIndex="firstName"
          key="firstName"
        />
        <Table.Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column
          title="Admin"
          dataIndex="isAdmin"
          key="isAdmin"
          render={isAdmin =>
            isAdmin ? <Icon type="check" /> : <Icon type="close" />
          }
        />
        <Table.Column<Employee>
          dataIndex="id"
          key="actions"
          render={(_, employee) => (
            <Dropdown overlay={actionsMenu(employee)}>
              <Icon type="plus-square" />
            </Dropdown>
          )}
        />
      </Table>
    </Layout>
  );
};

export default Employees;
