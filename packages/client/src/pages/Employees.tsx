import React from "react";
import { useCurrentRoute } from "react-navi";

import "./Employees.css";

const Employees: React.FC = () => {
  const route = useCurrentRoute();

  return (
    <div className="employees">
      <header className="employees-header">
        Employees on {route.url.pathname}
      </header>
    </div>
  );
};

export default Employees;
