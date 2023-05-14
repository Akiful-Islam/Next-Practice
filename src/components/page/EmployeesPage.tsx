"use client";

import React from "react";
import Card from "../Card";
import Button from "../input/Button";
import { useRouter } from "next/navigation";

type Props = {};

const EmployeesPage = (props: Props) => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title="Employees"
        hero={
          <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <Button
              className="my-1 w-full"
              title="Get All"
              onClick={() => router.push("/employees/get")}
            />
            <Button
              className="my-1  w-full"
              title="Get by Id"
              onClick={() => router.push("/employees/get/{id}")}
            />
            <Button
              className="my-1 w-full"
              title="Create"
              onClick={() => router.push("/employees/post")}
            />
            <Button
              className="my-1 w-full"
              title="Update"
              onClick={() => router.push("/employees/patch")}
            />
            <Button
              className="my-1 w-full"
              title="Delete"
              onClick={() => router.push("/employees/delete")}
            />
          </div>
        }
        footer={
          <Button
            title="Back"
            variant="transparent"
            onClick={() => router.push("/")}
          />
        }
      >
        {" "}
      </Card>
    </div>
  );
};

export default EmployeesPage;
