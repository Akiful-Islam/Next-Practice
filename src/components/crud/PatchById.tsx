"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { PatchData, patchEmployee } from "@/services/EmployeeServices";
import TextInput from "../input/TextInput";
import NumberInput from "../input/NumberInput";
import EmailInput from "../input/EmailInput";

const PatchById = () => {
  const [employeeId, setEmployeeId] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [patchedEmployee, setPatchedEmployee] = useState<Employee | null>(null);

  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const patchData: PatchData = {};
    if (editFirstName) patchData.firstName = firstName;
    if (editLastName) patchData.lastName = lastName;
    if (editEmail) patchData.email = email;

    const res = await patchEmployee(employeeId, patchData);

    if ("errorMessage" in res) {
      setPatchedEmployee(null);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setPatchedEmployee(res);
    }

    setShowResponse(true);
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
                <EmailInput
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
      <div className="response">
        {showResponse &&
          (patchedEmployee ? (
            <div className="ok-response">
              <p>Employee Patched :)</p>
              <EmployeeTable employees={[patchedEmployee]} />
            </div>
          ) : error ? (
            <div>
              <p>Error Occured :(</p>
              <p>{error}</p>
            </div>
          ) : (
            <p>Something went wrong :(</p>
          ))}
      </div>
    </div>
  );
};

export default PatchById;