"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../data/EmployeeTable";
import { PatchData, patchEmployee } from "@/services/EmployeeServices";
import { useForm, Controller } from "react-hook-form";
import Toggler from "../input/Toggler";

const PatchById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
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
            <Controller
              name="edit.firstName"
              control={control}
              render={({ field }) => (
                <Toggler {...field} label="Edit First Name" />
              )}
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
            <Controller
              name="edit.lastName"
              control={control}
              render={({ field }) => (
                <Toggler {...field} label="Edit Last Name" />
              )}
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
            <Controller
              name="edit.email"
              control={control}
              render={({ field }) => <Toggler {...field} label="Edit Email" />}
            />
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
