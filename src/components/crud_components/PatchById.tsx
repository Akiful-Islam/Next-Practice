"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";

const PatchById = () => {
  const [employeeId, setEmployeeId] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const [error, setError] = useState("");

  const [patchedEmployee, setPatchedEmployee] = useState<Employee | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const patchData: any = {};
    if (editFirstName) patchData.firstName = firstName;
    if (editLastName) patchData.lastName = lastName;
    if (editEmail) patchData.email = email;

    const url = `http://localhost:3030/api/employees/${employeeId}`;

    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setPatchedEmployee(null);
          throw new Error("Error patching employee");
        }
      })
      .then((data) => {
        console.log(data);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPatchedEmployee(data);
      })
      .catch((err) => {
        console.log(err);

        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Patch by ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter ID"
            required
          />
        </label>
        <br />
        {employeeId && (
          <div>
            <label>
              <input
                type="checkbox"
                checked={editFirstName}
                onChange={() => setEditFirstName(!editFirstName)}
              />
              Edit First Name
            </label>

            <label>
              <input
                type="checkbox"
                checked={editLastName}
                onChange={() => setEditLastName(!editLastName)}
              />
              Edit Last Name
            </label>

            <label>
              <input
                type="checkbox"
                checked={editEmail}
                onChange={() => setEditEmail(!editEmail)}
              />
              Edit Email
            </label>
            <br />
            {editFirstName && (
              <label>
                First Name:
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  required
                />
              </label>
            )}
            {editLastName && (
              <label>
                Last Name:
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                  required
                />
              </label>
            )}
            {editEmail && (
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </label>
            )}
            <br />
          </div>
        )}
        {firstName || lastName || email ? (
          <button type="submit">Post Employee</button>
        ) : null}
      </form>
      {patchedEmployee ? (
        <div>
          <h1>Employee Patched</h1>
          <EmployeeTable employees={[patchedEmployee]} />
        </div>
      ) : (
        error && <h1>Employee not found with id: {employeeId}</h1>
      )}
    </div>
  );
};

export default PatchById;
