"use client";
import {
  EmployeePosition,
  PatchEmployee,
  ResponseEmployee,
} from "@/types/Employee";
import React from "react";
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

  const onSubmit = async (data: PatchEmployee) => {
    const params = new URLSearchParams();
    if (dirtyFields.firstName && data.firstName) {
      params.append("firstName", data.firstName);
    }
    if (dirtyFields.lastName && data.lastName) {
      params.append("lastName", data.lastName);
    }
    if (dirtyFields.email && data.email) {
      params.append("email", data.email);
    }
    if (dirtyFields.phoneNumber && data.phoneNumber) {
      params.append("phoneNumber", data.phoneNumber);
    }
    if (dirtyFields.position && data.position) {
      params.append("position", data.position);
    }
    router.push(`/employees/${employee.id}/edit?${params.toString()}`);
    reset({
      firstName: data.firstName || employee.firstName,
      lastName: data.lastName || employee.lastName,
      email: data.email || employee.email,
      phoneNumber: data.phoneNumber || employee.phoneNumber,
      position: data.position || employee.position,
    });
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
