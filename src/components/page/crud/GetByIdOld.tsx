"use client";

import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import { getEmployeeById } from "@/services/EmployeeServices";
import NumberInput from "../../input/NumberInput";
import Card from "@/components/Card";
import Button from "@/components/input/Button";
import { useRouter } from "next/navigation";
import { type } from "os";

type Props = {
  routeId: string;
};

const GetByIdOld: React.FC<Props> = ({ routeId }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>();
  const [employeeId, setEmployeeId] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await getEmployeeById(employeeId);

    if ("errorMessage" in res) {
      setEmployee(null);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setEmployee(res);
    }
    setShowResponse(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={"Get Employee By Id " + routeId}
        hero={
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="employeeId">Employee Id: </label>
              <NumberInput
                id="employeeId"
                value={employeeId}
                setValue={setEmployeeId}
                placeholder="Id"
              />
              {employeeId > 0 ? <button type="submit">Search</button> : null}
            </form>
            <div className="response">
              {showResponse &&
                (employee ? (
                  <EmployeeTable employees={[employee]} />
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
          <Button title="Back" onClick={() => router.push("/employees")} />
        }
      />
    </div>
  );
};

export default GetByIdOld;
