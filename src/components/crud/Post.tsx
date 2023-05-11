"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";
import TextInput from "../input/TextInput";
import EmailInput from "../input/EmailInput";

const Post = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [postedEmployee, setPostedEmployee] = useState<Employee | null>(null);

  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await postEmployee(employee);

    if ("errorMessage" in res) {
      setPostedEmployee(null);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setPostedEmployee(res);
    }
    setShowResponse(true);
  };
  return (
    <div>
      <h1>Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <TextInput
            value={employee.firstName}
            setValue={(value) => setEmployee({ ...employee, firstName: value })}
            placeholder="First Name"
          />
        </label>
        <label>
          Last Name:
          <TextInput
            value={employee.lastName}
            setValue={(value) => setEmployee({ ...employee, lastName: value })}
            placeholder="Last Name"
          />
        </label>
        <label>
          Email:
          <EmailInput
            value={employee.email}
            setValue={(value) => setEmployee({ ...employee, email: value })}
            placeholder="Email"
          />
        </label>
        {employee.firstName && employee.lastName && employee.email ? (
          <button type="submit">Post Employee</button>
        ) : null}
      </form>
      <div className="response">
        {showResponse &&
          (postedEmployee ? (
            <div className="ok-response">
              <p>Employee successfully Posted :D</p>
              <EmployeeTable employees={[postedEmployee]} />
            </div>
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

export default Post;
