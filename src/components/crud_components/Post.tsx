"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";
import TextInput from "../input_components/TextInput";
import EmailInput from "../input_components/EmailInput";

const Post = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [postedEmployee, setPostedEmployee] = useState<Employee | null>(null);

  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await postEmployee({
      firstName,
      lastName,
      email,
    });

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
            value={firstName}
            setValue={setFirstName}
            placeholder="First Name"
          />
        </label>
        <label>
          Last Name:
          <TextInput
            value={lastName}
            setValue={setLastName}
            placeholder="Last Name"
          />
        </label>
        <label>
          Email:
          <EmailInput value={email} setValue={setEmail} placeholder="Email" />
        </label>
        {firstName && lastName && email ? (
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
