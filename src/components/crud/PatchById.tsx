"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import { PatchData, patchEmployee } from "@/services/EmployeeServices";
import { useForm } from "react-hook-form";

const PatchById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      edit: {
        firstName: false,
        lastName: false,
        email: false,
      },
    },
  });

  const watchFields = watch();
  const { edit } = watchFields;

  const [error, setError] = useState<string | null>(null);
  const [patchedEmployee, setPatchedEmployee] = useState<Employee | null>(null);

  const [showResponse, setShowResponse] = useState(false);

  const onSubmit = async (data: any) => {
    const patchData: PatchData = {};
    if (edit.firstName) patchData.firstName = data.firstName;
    if (edit.lastName) patchData.lastName = data.lastName;
    if (edit.email) patchData.email = data.email;

    const res = await patchEmployee(data.id, patchData);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="employee-id">Employee ID:</label>
        <input
          {...register("id")}
          type="number"
          id="id"
          placeholder="Insert ID"
        />

        <br />
        {watchFields.id > 0 && (
          <div>
            <label htmlFor="first-name">Edit First Name</label>
            <input
              {...register("edit.firstName")}
              type="checkbox"
              id="editFistName"
            />
            {edit.firstName && (
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                placeholder="Enter First Name"
              />
            )}
            <br />
            <label>Edit Last Name</label>
            <input
              {...register("edit.lastName")}
              type="checkbox"
              id="editLastName"
            />

            {edit.lastName && (
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
              />
            )}
            <br />
            <label>Edit Email</label>
            <input {...register("edit.email")} type="checkbox" id="editEmail" />
            {edit.email && (
              <input
                {...register("email")}
                type="text"
                id="email"
                placeholder="Enter Email"
              />
            )}
          </div>
        )}
        {watchFields.id > 0 &&
        (edit.firstName || edit.lastName || edit.email) ? (
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
