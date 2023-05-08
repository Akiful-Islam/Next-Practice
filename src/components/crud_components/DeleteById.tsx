"use client";

import { deleteEmployee } from "@/services/EmployeeServices";
import React, { useState } from "react";

const DeleteById = () => {
  const [employeeFound, setemployeeFound] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
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
        <input
          id="employeeId"
          type="number"
          value={employeeId}
          placeholder="Id"
          onChange={(event) => setEmployeeId(event.target.value)}
        />
        {employeeId ? <button type="submit">Delete</button> : null}
      </form>
      {showResponse ? (
        employeeFound ? (
          <p>Employee Deleted :D</p>
        ) : (
          <p>Employee Not found :(</p>
        )
      ) : null}
    </div>
  );
};

export default DeleteById;
