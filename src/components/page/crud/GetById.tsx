"use client";
import Card from "@/components/Card";
import EmployeeTable from "@/components/data/EmployeeTable";
import Button from "@/components/input/Button";
import { getEmployeeById } from "@/services/EmployeeServices";
import { Employee } from "@/types/Employee";
import { useRouter } from "next/navigation";
import { parse } from "path";
import React, { useEffect, useState } from "react";

type Props = {
  routeId: string;
};

const GetById: React.FC<Props> = ({ routeId }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>();
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeById = async (routeId: string) => {
    if (isNaN(parseInt(routeId))) {
      setError("Invalid Route: " + routeId + ". Please enter a valid number.");
      setEmployee(null);
      return;
    }
    const res = await getEmployeeById(parseInt(routeId));

    if ("errorMessage" in res) {
      setEmployee(null);
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setEmployee(res);
    }
  };

  useEffect(() => {
    fetchEmployeeById(routeId);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={"Employee " + routeId + ":"}
        hero={
          <div className="response">
            {employee ? (
              <EmployeeTable employees={[employee]} />
            ) : (
              error && (
                <div>
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

export default GetById;
