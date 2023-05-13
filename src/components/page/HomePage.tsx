"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../input/Button";
import Card from "../Card";

const HomePage = () => {
  const router = useRouter();
  return (
    <Card
      title="Welcome"
      hero={
        <Button
          className="m-8"
          title="Employees"
          onClick={() => router.push("/employees")}
        />
      }
      footer={
        <p className="text-sm font-light text-bnw-blue-gray">Home Page</p>
      }
    ></Card>
  );
};

export default HomePage;
