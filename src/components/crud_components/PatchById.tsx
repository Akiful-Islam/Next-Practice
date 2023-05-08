"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { PatchData, patchEmployee } from "@/services/EmployeeServices";
import TextInput from "../input_components/TextInput";
import NumberInput from "../input_components/NumberInput";

const PatchById = () => {
  const [employeeId, setEmployeeId] = useState(0);

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

    const patchData: PatchData = {};
    if (editFirstName) patchData.firstName = firstName;
    if (editLastName) patchData.lastName = lastName;
    if (editEmail) patchData.email = email;

    patchEmployee({
      patchData,
      employeeId,
      setFirstName,
      setLastName,
      setEmail,
      setPatchedEmployee,
      setError,
    });
  };

  return (
    <div>
      <h2>Patch by ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <NumberInput
            value={employeeId}
            setValue={setEmployeeId}
            placeholder="Employee ID"
          />
        </label>
        <br />
        {employeeId > 0 && (
          <div>
            <label>
              <input
                type="checkbox"
                checked={editFirstName}
                onChange={() => setEditFirstName(!editFirstName)}
              />
              Edit First Name
            </label>
            {editFirstName && (
              <label>
                :
                <TextInput
                  value={firstName}
                  setValue={setFirstName}
                  placeholder="Enter First Name"
                />
              </label>
            )}
            <br />
            <label>
              <input
                type="checkbox"
                checked={editLastName}
                onChange={() => setEditLastName(!editLastName)}
              />
              Edit Last Name
            </label>
            {editLastName && (
              <label>
                :
                <TextInput
                  value={lastName}
                  setValue={setLastName}
                  placeholder="Enter Last Name"
                />
              </label>
            )}
            <br />
            <label>
              <input
                type="checkbox"
                checked={editEmail}
                onChange={() => setEditEmail(!editEmail)}
              />
              Edit Email
            </label>
            {editEmail && (
              <label>
                :
                <TextInput
                  value={email}
                  setValue={setEmail}
                  placeholder="Enter Email"
                />
              </label>
            )}
          </div>
        )}
        {firstName || lastName || email ? (
          <button type="submit">Update Employee</button>
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
