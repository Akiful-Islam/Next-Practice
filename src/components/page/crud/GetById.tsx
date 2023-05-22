"use client";
import Card from "@/components/Card";
import EmployeeTable from "@/components/data/EmployeeTable";
import Button from "@/components/input/Button";
import { ResponseEmployee } from "@/types/Employee";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  employee: ResponseEmployee;
};

const GetById: React.FC<Props> = ({ employee }) => {
  const router = useRouter();

  return (
    <div className="relative min-h-max flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={`${employee.firstName} ${employee.lastName}'s details`}
        hero={
          <div className="response">
            <EmployeeTable employees={employee} />
          </div>
        }
        footer={
          <Button
            className="!h-8 !w-16 !text-sm font-medium"
            variant="transparent"
            title="Return"
            onClick={() => router.push("/employees/all")}
          />
        }
      />
    </div>
  );
};

export default GetById;
