"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";
import { Controller, useForm } from "react-hook-form";
import Card from "@/components/Card";
import Button from "@/components/input/Button";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import ControlledInput from "@/components/input/controlled/ControlledInput";

const Post = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onSubmit",
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
      <Card
        title="Create An Employee"
        hero={
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput
              name="firstName"
              control={control}
              rules={{ required: true }}
              label="First Name"
            />
            <ControlledInput
              name="lastName"
              control={control}
              rules={{ required: true }}
              label="Last Name"
            />
            <ControlledInput
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address.",
                },
              }}
              label="Email"
              type="email"
            />
            {watchFields.firstName &&
            watchFields.lastName &&
            watchFields.email ? (
              <button type="submit">Post Employee</button>
            ) : null}
          </form>
        }
        footer={
          <Button
            title="Back"
            type="transparent"
            onClick={() => router.push("/employees")}
          />
        }
      />

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
