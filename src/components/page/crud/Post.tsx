"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";
import { useForm } from "react-hook-form";

const Post = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const watchFields = watch();

  const [error, setError] = useState<string | null>(null);
  const [postedEmployee, setPostedEmployee] = useState<Employee | null>(null);

  const [showResponse, setShowResponse] = useState(false);

  const onSubmit = async (data: any) => {
    const res = await postEmployee(data);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first-name">First Name:</label>
        <input
          {...register("firstName", { required: true })}
          type="text"
          id="firstName"
          placeholder="First Name"
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          {...register("lastName", { required: true })}
          type="text"
          id="lastName"
          placeholder="Last Name"
        />
        <label htmlFor="email">Email:</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          placeholder="Email"
        />
        {watchFields.firstName && watchFields.lastName && watchFields.email ? (
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
