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

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [edit, setEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [patchedEmployee, setPatchedEmployee] = useState<Employee | null>(null);

  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const patchData: PatchData = {};
    if (edit.firstName) patchData.firstName = employee.firstName;
    if (edit.lastName) patchData.lastName = employee.lastName;
    if (edit.email) patchData.email = employee.email;

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
                checked={edit.firstName}
                onChange={() =>
                  setEdit({ ...edit, firstName: !edit.firstName })
                }
              />
              Edit First Name
            </label>
            {edit.firstName && (
              <label>
                :
                <TextInput
                  value={employee.firstName}
                  setValue={(value) =>
                    setEmployee({ ...employee, firstName: value })
                  }
                  placeholder="Enter First Name"
                />
              </label>
            )}
            <br />
            <label>
              <input
                type="checkbox"
                checked={edit.lastName}
                onChange={() => setEdit({ ...edit, lastName: !edit.lastName })}
              />
              Edit Last Name
            </label>
            {edit.lastName && (
              <label>
                :
                <TextInput
                  value={employee.lastName}
                  setValue={(value) =>
                    setEmployee({ ...employee, lastName: value })
                  }
                  placeholder="Enter Last Name"
                />
              </label>
            )}
            <br />
            <label>
              <input
                type="checkbox"
                checked={edit.email}
                onChange={() => setEdit({ ...edit, email: !edit.email })}
              />
              Edit Email
            </label>
            {edit.email && (
              <label>
                :
                <EmailInput
                  value={employee.email}
                  setValue={(value) =>
                    setEmployee({ ...employee, email: value })
                  }
                  placeholder="Enter Email"
                />
              </label>
            )}
          </div>
        )}
        {employeeId > 0 && (edit.firstName || edit.lastName || edit.email) ? (
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
