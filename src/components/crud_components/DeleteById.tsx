"use client";

import React, { useState } from "react";

const DeleteById = () => {
  const [employeeFound, setemployeeFound] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `http://localhost:3030/api/employees/${employeeId}`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId }),
    })
      .then((response) => {
        if (response.status === 204) {
          setemployeeFound(true);
          return response.json();
        } else {
          throw new Error("Error deleting employee");
        }
      })
      .then((data) => {
        console.log(data);
        setEmployeeId("");
      })
      .catch((err) => {
        console.log(err.message);
      });
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
