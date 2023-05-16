"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { postEmployee } from "@/services/EmployeeServices";
import { useForm } from "react-hook-form";
import Card from "@/components/Card";
import Button from "@/components/input/Button";
import { useRouter } from "next/navigation";
import ControlledInput from "@/components/input/controlled/ControlledInput";

const Post = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onSubmit",
  });

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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title="Create An Employee"
        hero={
          <div>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <ControlledInput
                  name="firstName"
                  control={control}
                  rules={{ required: "First Name cannot be empty." }}
                  label="First Name"
                />
                <ControlledInput
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name cannot be empty." }}
                  label="Last Name"
                />
                <ControlledInput
                  name="email"
                  control={control}
                  rules={{
                    required: "Email cannot be empty.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format.",
                    },
                  }}
                  label="Email"
                  type="email"
                />
              </div>

              {dirtyFields.firstName &&
                dirtyFields.lastName &&
                dirtyFields.email && (
                  <Button type="submit" title="Create Employee" />
                )}
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
        }
        footer={
          <Button
            className="!h-8 !w-16 !text-sm font-medium"
            title="Back"
            variant="transparent"
            onClick={() => router.back()}
          />
        }
      />
    </div>
  );
};

export default Post;
