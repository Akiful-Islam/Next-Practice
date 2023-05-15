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

type Props = {
  routeId: string;
};

const PatchById: React.FC<Props> = ({ routeId }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
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
  const [employeeExists, setEmployeeExists] = useState(false);

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
      setEmployeeExists(true);
    }
  };

  useEffect(() => {
    fetchEmployeeById(routeId);
  }, []);

  const onSubmit = async (data: any) => {
    const patchData: PatchData = {};
    if (edit.firstName) patchData.firstName = data.firstName;
    if (edit.lastName) patchData.lastName = data.lastName;
    if (edit.email) patchData.email = data.email;

    const res = await patchEmployee(parseInt(routeId), patchData);

    if ("errorMessage" in res) {
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setPatchedEmployee(res);
    }
    setShowResponse(true);
  };

  let title;
  if (employeeExists) {
    title = `Update Employee ${routeId}`;
  } else {
    title = "Invalid Employee ID";
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={title}
        hero={
          <div>
            {employeeExists ? (
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <ControlledToggler
                      name="edit.firstName"
                      control={control}
                      label="Edit First Name"
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
                    <ControlledToggler
                      name="edit.lastName"
                      control={control}
                      label="Edit Last Name"
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
                    <ControlledToggler
                      name="edit.email"
                      control={control}
                      label="Edit Email"
                    />
                    {edit.email && (
                      <input
                        {...register("email")}
                        type="text"
                        id="email"
                        placeholder="Enter Email"
                      />
                    )}
                    {error && (
                      <div className="response">
                        <p>{error}</p>
                      </div>
                    )}
                  </div>

                  {edit.firstName || edit.lastName || edit.email ? (
                    <button type="submit">Update Employee</button>
                  ) : null}
                </form>
                {showResponse && (
                  <div className="response">
                    {patchedEmployee ? (
                      <EmployeeTable employees={[patchedEmployee]} />
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
