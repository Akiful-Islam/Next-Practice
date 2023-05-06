import { Employee } from "@/dummy_data/DummyEmployee";
import React from "react";

type Props = {
  employees: Employee[];
};

const EmployeeTable: React.FC<Props> = ({ employees }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
