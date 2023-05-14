"use client";

import { deleteEmployee } from "@/services/EmployeeServices";
import React, { useState } from "react";
import NumberInput from "../../input/NumberInput";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Button from "@/components/input/Button";

const DeleteById = () => {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState(0);

  const [employeeFound, setemployeeFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await deleteEmployee(employeeId);
    if (res) {
      setemployeeFound(false);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setemployeeFound(true);
    }
    setShowResponse(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title="Delete Employee"
        hero={
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="employeeId">Employee Id: </label>
              <NumberInput
                value={employeeId}
                setValue={setEmployeeId}
                placeholder="Employee Id"
              />
              {employeeId > 0 ? <Button title="Delete" type="submit" /> : null}
            </form>
            <div className="response">
              {showResponse ? (
                employeeFound ? (
                  <div className="ok-response">
                    <p>Employee Deleted :D</p>
                  </div>
                ) : error ? (
                  <div>
                    <p>Error Occured :(</p>
                    <p>{error}</p>
                  </div>
                ) : (
                  <p>Something went wrong :(</p>
                )
              ) : null}
            </div>
          </div>
        }
        footer={
          <Button title="Back" onClick={() => router.push("/employees")} />
        }
      />
    </div>
  );
};

export default DeleteById;
