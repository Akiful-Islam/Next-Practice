"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";

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
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Enter First Name"
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Enter Last Name"
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter Email"
            required
          />
        </label>
        <br />
        {firstName && lastName && email ? (
          <button type="submit">Post Employee</button>
        ) : null}
      </form>
      {postedEmployee ? (
        <div>
          <p>Employee successfully Posted</p>
          <EmployeeTable employees={[postedEmployee]} />
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
};

export default Post;
