"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { getEmployeeById } from "@/services/EmployeeServices";
import NumberInput from "../input/NumberInput";

const GetById = () => {
  const [employee, setEmployee] = useState<Employee | null>();
  const [employeeId, setEmployeeId] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await getEmployeeById(employeeId);

    if ("errorMessage" in res) {
      setEmployee(null);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setEmployee(res);
    }
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
      <div className="response">
        {showResponse &&
          (employee ? (
            <EmployeeTable employees={[employee]} />
          ) : error ? (
            <div>
              <p>Error Occured :(</p>
              <p>{error}</p>
            </div>
          ) : (
            <p>Something Happened :(</p>
          ))}
      </div>
    </div>
  );
};

export default GetById;
