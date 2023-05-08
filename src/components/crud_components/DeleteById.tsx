"use client";

import { deleteEmployee } from "@/services/EmployeeServices";
import React, { useState } from "react";
import NumberInput from "../input_components/NumberInput";

const DeleteById = () => {
  const [employeeFound, setemployeeFound] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteEmployee(employeeId, setEmployeeId, setemployeeFound);
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
          ) : (
            <p>Employee Not found :(</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default DeleteById;
