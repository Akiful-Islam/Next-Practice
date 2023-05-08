"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";
import TextInput from "../input_components/TextInput";

const Post = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [postedEmployee, setPostedEmployee] = useState<Employee | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postEmployee({
      firstName,
      lastName,
      email,
      setFirstName,
      setLastName,
      setEmail,
      setError,
      setPostedEmployee,
    });
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
          <TextInput value={email} setValue={setEmail} placeholder="Email" />
        </label>
        {firstName && lastName && email ? (
          <button type="submit">Post Employee</button>
        ) : null}
      </form>
      {postedEmployee ? (
        <div>
          <p>Employee successfully Posted :D</p>
          <EmployeeTable employees={[postedEmployee]} />
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
};

export default Post;
