"use client";

import {
  EmployeePosition,
  PostEmployee,
  ResponseEmployee,
} from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { useForm } from "react-hook-form";
import Card from "@/components/Card";
import Button from "@/components/input/Button";
import { useRouter } from "next/navigation";
import ControlledInput from "@/components/input/controlled/ControlledInput";
import ControlledSelector from "@/components/input/controlled/ControlledSelector";

const Post = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
  } = useForm<PostEmployee>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      position: EmployeePosition.DEVELOPER,
    },
    mode: "onSubmit",
  });

  const [postedEmployee, setPostedEmployee] = useState<ResponseEmployee | null>(
    null
  );

  const [showResponse, setShowResponse] = useState(false);

  const onSubmit = async (data: PostEmployee) => {
    console.log(data);

    const res = await fetch("http://localhost:3030/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });

    if (!("errorMessage" in res)) {
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
                <ControlledInput
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: "Phone Number cannot be empty",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Phone number must only contain 11 digits.",
                    },
                  }}
                  label="Phone Number"
                  type="tel"
                />
                <ControlledSelector
                  name="position"
                  control={control}
                  rules={{ required: "Position cannot be empty." }}
                  label="Position"
                  options={[
                    { value: EmployeePosition.DEVELOPER, label: "Developer" },
                    { value: EmployeePosition.QA, label: "QA" },
                    { value: EmployeePosition.MANAGER, label: "Manager" },
                    { value: EmployeePosition.HR, label: "HR" },
                  ]}
                />
              </div>

              {dirtyFields.firstName &&
                dirtyFields.lastName &&
                dirtyFields.email &&
                dirtyFields.phoneNumber && (
                  <Button type="submit" title="Create Employee" />
                )}
            </form>

            <div className="response">
              {showResponse && postedEmployee && (
                <div className="ok-response">
                  <p>Employee successfully Posted :D</p>
                  <EmployeeTable employees={[postedEmployee]} />
                </div>
              )}
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
