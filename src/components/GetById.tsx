"use client";

import { Employee, dummyEmployees } from "@/dummy_data/DummyEmployee";
import React, { useState } from "react";
import EmployeeTable from "./EmployeeTable";

const GetById = () => {
  const [employee, setEmployee] = useState<Employee | null>();
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const foundEmployee = dummyEmployees.find(
      (employee) => employee.id === parseInt(employeeId)
    );
    setEmployee(foundEmployee || null);
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
          style={{
            width: 64,
            height: 36,
            color: "black",
            borderRadius: 6,
            margin: 8,
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />
        <button
          type="submit"
          style={{
            border: 12,
            padding: 8,
            background: "white",
            borderRadius: 6,
            color: "black",
          }}
        >
          Search
        </button>
      </form>
      {employee ? (
        <EmployeeTable employees={[employee]} />
      ) : (
        <p>Employee Not found :(</p>
      )}
    </div>
  );
};

export default GetById;
