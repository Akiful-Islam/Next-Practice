"use client";

import { deleteEmployee } from "@/services/EmployeeServices";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Button from "@/components/input/Button";

type Props = {
  routeId: string;
};

const DeleteById: React.FC<Props> = ({ routeId }) => {
  const router = useRouter();

  const [employeeFound, setEmployeeFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeleteById = async (routeId: string) => {
    const parsedId = parseInt(routeId);
    if (isNaN(parsedId)) {
      setError(`Invalid route "${routeId}". Enter a valid number.`);
      return;
    }

    if (parsedId < 1) {
      setError(`Invalid route "${routeId}". Id starts from 1.`);
      return;
    }
    const res = await deleteEmployee(parsedId);
    if (res) {
      setError(`${res.code} - ${res.errorMessage}`);
    } else {
      setEmployeeFound(true);
    }
  };

  useEffect(() => {
    fetchDeleteById(routeId);
  }, []);

  let title;
  if (employeeFound) {
    title = `Employee Deleted`;
  } else {
    title = "Invalid Employee ID";
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={title}
        hero={
          <div className="response">
            {employeeFound ? (
              <div className="ok-response">
                <p>Employee Successfully Deleted with id: {routeId}</p>
              </div>
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

export default DeleteById;
