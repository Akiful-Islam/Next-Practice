"use client";
import {
  EmployeePosition,
  PatchEmployee,
  ResponseEmployee,
} from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { useForm } from "react-hook-form";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Button from "@/components/input/Button";
import ControlledInput from "@/components/input/controlled/ControlledInput";
import ControlledSelector from "@/components/input/controlled/ControlledSelector";

type Props = {
  employee: ResponseEmployee;
};

const PatchById: React.FC<Props> = ({ employee }) => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    control,
    reset,
  } = useForm<PatchEmployee>({
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      position: employee.position,
    },
  });

  const [patchedEmployee, setPatchedEmployee] =
    useState<ResponseEmployee | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const onSubmit = async (data: PatchEmployee) => {
    const patchData: PatchEmployee = {};
    if (dirtyFields.firstName) patchData.firstName = data.firstName;
    if (dirtyFields.lastName) patchData.lastName = data.lastName;
    if (dirtyFields.email) patchData.email = data.email;
    if (dirtyFields.phoneNumber) patchData.phoneNumber = data.phoneNumber;
    if (dirtyFields.position) patchData.position = data.position;

    const url = `http://localhost:3030/api/employees/${employee.id}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchData),
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
    setPatchedEmployee(res);
    reset({
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      phoneNumber: res.phoneNumber,
      position: res.position,
    });
    setShowResponse(true);
  };

  return (
    <div className="relative min-h-max flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={`Edit Employee ${employee.id}`}
        hero={
          <div>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <ControlledInput
                  name="firstName"
                  control={control}
                  rules={{
                    required: "First Name cannot be empty",
                  }}
                  type="text"
                  label="First Name"
                />
                <ControlledInput
                  name="lastName"
                  control={control}
                  rules={{
                    required: "Last Name cannot be empty",
                  }}
                  type="text"
                  label="Last Name"
                />
                <ControlledInput
                  name="email"
                  control={control}
                  rules={{
                    required: "Email cannot be empty",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format.",
                    },
                  }}
                  type="email"
                  label="Email"
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
                  type="tel"
                  label="Phone Number"
                />
                <ControlledSelector
                  name="position"
                  control={control}
                  rules={{
                    required: "Position cannot be empty",
                  }}
                  label="Position"
                  options={[
                    {
                      value: EmployeePosition.DEVELOPER,
                      label: "Developer",
                    },
                    { value: EmployeePosition.QA, label: "QA" },
                    { value: EmployeePosition.MANAGER, label: "Manager" },
                    { value: EmployeePosition.HR, label: "HR" },
                  ]}
                />
              </div>

              {isDirty && <Button title="Update Employee" type="submit" />}
            </form>
            <div className="response">
              {showResponse && patchedEmployee && (
                <div className="ok-response">
                  <p>Employee successfully Updated :D</p>
                  <EmployeeTable employees={patchedEmployee} />
                </div>
              )}
            </div>
          </div>
        }
        footer={
          <Button
            className="!h-8 !w-16 !text-sm font-medium"
            variant="transparent"
            title="Return"
            onClick={() => router.back()}
          />
        }
      />
    </div>
  );
};

export default PatchById;
