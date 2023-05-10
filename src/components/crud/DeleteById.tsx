"use client";

import { deleteEmployee } from "@/services/EmployeeServices";
import React, { useState } from "react";
import NumberInput from "../input/NumberInput";

const DeleteById = () => {
  const [employeeId, setEmployeeId] = useState(0);

  const [employeeFound, setemployeeFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await deleteEmployee(employeeId);
    if (res) {
      setemployeeFound(false);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setemployeeFound(true);
    }
    setShowResponse(true);
  };

  return (
    <div>
      <h2>Delete by Id</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="employeeId">Employee Id: </label>
        <NumberInput
          value={employeeId}
          setValue={setEmployeeId}
          placeholder="Employee Id"
        />
        {employeeId > 0 ? <button type="submit">Delete</button> : null}
      </form>
      <div className="response">
        {showResponse ? (
          employeeFound ? (
            <div className="ok-response">
              <p>Employee Deleted :D</p>
            </div>
          ) : error ? (
            <div>
              <p>Error Occured :(</p>
              <p>{error}</p>
            </div>
          ) : (
            <p>Something went wrong :(</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default DeleteById;
