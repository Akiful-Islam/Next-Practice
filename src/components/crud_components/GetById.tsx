"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { getEmployeeById } from "@/services/EmployeeServices";
import NumberInput from "../input_components/NumberInput";

const GetById = () => {
  const [employee, setEmployee] = useState<Employee | null>();
  const [employeeId, setEmployeeId] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getEmployeeById(employeeId, setEmployee);
    setShowResponse(true);
  };

  return (
    <div>
      <h2>Get by Id</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="employeeId">Employee Id: </label>
        <NumberInput
          id="employeeId"
          value={employeeId}
          setValue={setEmployeeId}
          placeholder="Id"
        />
        {employeeId > 0 ? <button type="submit">Search</button> : null}
      </form>
      {showResponse ? (
        employee ? (
          <EmployeeTable employees={[employee]} />
        ) : (
          <p>Employee Not found :(</p>
        )
      ) : null}
    </div>
  );
};

export default GetById;
