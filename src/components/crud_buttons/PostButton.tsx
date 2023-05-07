"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";

type Props = {};

const PostButton = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [postedEmployee, setPostedEmployee] = useState<Employee | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `http://localhost:3030/api/employees`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error adding employee");
        }
      })
      .then((data) => {
        console.log(data);
        setFirstName("");
        setLastName("");
        setEmail("");
        setError("");
        setPostedEmployee(data);
      })
      .catch((err) => {
        setError(err.message);
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
        <button type="submit">Post Employee</button>
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

export default PostButton;
