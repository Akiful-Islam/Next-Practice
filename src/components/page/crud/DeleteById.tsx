"use client";

import React from "react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Button from "@/components/input/Button";
import { ResponseEmployee } from "@/types/Employee";

type Props = {
  deletedEmployee: ResponseEmployee;
};

const DeleteById: React.FC<Props> = ({ deletedEmployee }) => {
  const router = useRouter();

  return (
    <div className="relative min-h-max flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title={`Deleted Employee: ${deletedEmployee.id}`}
        hero={
          <div className="animate-pulse">
            <h3 className="overflow-x-auto text-xl text-green-600 my-4">{`Successfully Deleted ${deletedEmployee.firstName} ${deletedEmployee.lastName}`}</h3>
            <h4 className="overflow-x-auto text-lg text-green-500 my-4">{`Position: ${deletedEmployee.position}`}</h4>
            <p className="overflow-x-auto font-normal text-base text-green-400 my-4">
              {`Phone: ${deletedEmployee.phoneNumber}`}
            </p>
            <p className="overflow-x-auto font-normal text-base text-green-400 my-4">
              {`Email: ${deletedEmployee.email}`}
            </p>
          </div>
        }
        footer={
          <Button
            className="!h-8 !w-16 !text-sm font-medium"
            variant="transparent"
            title="Return"
            onClick={() => router.push(`/employees/get`)}
          />
        }
      />
    </div>
  );
};

export default DeleteById;
