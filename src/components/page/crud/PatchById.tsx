"use client";
import { Employee } from "@/types/Employee";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import {
  PatchData,
  getEmployeeById,
  patchEmployee,
} from "@/services/EmployeeServices";
import { useForm } from "react-hook-form";
import ControlledToggler from "../../input/controlled/ControlledToggler";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Button from "@/components/input/Button";
import ControlledInput from "@/components/input/controlled/ControlledInput";

type Props = {
  routeId: string;
};

const PatchById: React.FC<Props> = ({ routeId }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    control,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [patchedEmployee, setPatchedEmployee] = useState<Employee | null>(null);
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
      });
    }
  };

  useEffect(() => {
    fetchEmployeeById(routeId);
  }, []);

  const onSubmit = async (data: any) => {
    const patchData: PatchData = {};
    if (dirtyFields.firstName) patchData.firstName = data.firstName;
    if (dirtyFields.lastName) patchData.lastName = data.lastName;
    if (dirtyFields.email) patchData.email = data.email;

    const res = await patchEmployee(parseInt(routeId), patchData);

    if ("errorMessage" in res) {
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setPatchedEmployee(res);
      reset({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
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
                        required: "First Name is cannot be empty",
                      }}
                      type="text"
                      label="First Name"
                    />
                    <ControlledInput
                      name="lastName"
                      control={control}
                      rules={{
                        required: "Last Name is cannot be empty",
                      }}
                      type="text"
                      label="Last Name"
                    />
                    <ControlledInput
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is cannot be empty",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email format.",
                        },
                      }}
                      type="email"
                      label="Email"
                    />
                    {error && (
                      <div className="response">
                        <p>{error}</p>
                      </div>
                    )}
                  </div>

                  {isDirty && <Button title="Update" type="submit" />}
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
          <Button title="Return" onClick={() => router.push("/employees")} />
        }
      />
    </div>
  );
};

export default PatchById;
