"use client";
import {
  EmployeePosition,
  PatchEmployee,
  ResponseEmployee,
} from "@/types/Employee";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { getEmployeeById, patchEmployee } from "@/services/EmployeeServices";
import { useForm } from "react-hook-form";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Button from "@/components/input/Button";
import ControlledInput from "@/components/input/controlled/ControlledInput";
import ControlledSelector from "@/components/input/controlled/ControlledSelector";

type Props = {
  routeId: string;
};

const PatchById: React.FC<Props> = ({ routeId }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState<ResponseEmployee | null>(null);

  const {
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    control,
    reset,
  } = useForm<PatchEmployee>();

  const [error, setError] = useState<string | null>(null);
  const [patchedEmployee, setPatchedEmployee] =
    useState<ResponseEmployee | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const fetchEmployeeById = async (routeId: string) => {
    const parsedId = parseInt(routeId);
    if (isNaN(parsedId)) {
      setError(`Invalid route "${routeId}". Enter a valid number.`);
      return;
    }

    if (parsedId < 1) {
      setError(`Invalid route "${routeId}". Id starts from 1.`);
      return;
    }
    const res = await getEmployeeById(parsedId);
    if ("errorMessage" in res) {
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setEmployee(res);
      reset({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        phoneNumber: res.phoneNumber,
        position: res.position,
      });
    }
  };

  useEffect(() => {
    fetchEmployeeById(routeId);
  }, []);

  const onSubmit = async (data: PatchEmployee) => {
    const patchData: PatchEmployee = {};
    if (dirtyFields.firstName) patchData.firstName = data.firstName;
    if (dirtyFields.lastName) patchData.lastName = data.lastName;
    if (dirtyFields.email) patchData.email = data.email;
    if (dirtyFields.phoneNumber) patchData.phoneNumber = data.phoneNumber;
    if (dirtyFields.position) patchData.position = data.position;

    const res = await patchEmployee(parseInt(routeId), patchData);

    console.log(res);

    if ("errorMessage" in res) {
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setPatchedEmployee(res);
      reset({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        phoneNumber: res.phoneNumber,
        position: res.position,
      });
    }
    setShowResponse(true);
  };

  let title;
  if (employee) {
    title = `Update ${employee.firstName}'s informations`;
  } else {
    title = "Invalid Employee ID";
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={title}
        hero={
          <div>
            {employee ? (
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
                    {error && (
                      <div className="response">
                        <p>{error}</p>
                      </div>
                    )}
                  </div>

                  {isDirty && <Button title="Update Employee" type="submit" />}
                </form>
                {showResponse && (
                  <div className="response">
                    {patchedEmployee ? (
                      <EmployeeTable employees={[patchedEmployee]} noActions />
                    ) : (
                      error && <p>Employee not updated</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              error && (
                <div className="response">
                  <p>Error Occured :(</p>
                  <p>{error}</p>
                </div>
              )
            )}
          </div>
        }
        footer={
          <Button
            className="!h-8 !w-16 !text-sm font-medium"
            variant="transparent"
            title="Return"
            onClick={() => router.push("/employees/get")}
          />
        }
      />
    </div>
  );
};

export default PatchById;
