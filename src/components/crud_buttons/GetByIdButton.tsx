"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";

const GetByIdButton = () => {
  const [employee, setEmployee] = useState<Employee | null>();
  const [employeeId, setEmployeeId] = useState("");
  const [showEmployee, setShowEmployee] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `http://localhost:3030/api/employees/${employeeId}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setEmployee(null);
          throw new Error("Employee not found");
        }
      })
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowEmployee(true);
  };

  return (
    <div>
      <h2>Get by Id</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="employeeId">Employee Id: </label>
        <input
          id="employeeId"
          type="number"
          value={employeeId}
          placeholder="Enter Id"
          onChange={(event) => setEmployeeId(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {showEmployee ? (
        employee ? (
          <EmployeeTable employees={[employee]} />
        ) : (
          <p>Employee Not found :(</p>
        )
      ) : null}
    </div>
  );
};

export default GetByIdButton;
