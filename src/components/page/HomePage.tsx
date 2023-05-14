"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../input/Button";
import Card from "../Card";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title="Welcome"
        hero={
          <Button
            className="m-8"
            title="Enter"
            onClick={() => router.push("/employees")}
          />
        }
        footer={
          <p className="text-sm font-light text-bnw-blue-gray">Home Page</p>
        }
      ></Card>
    </div>
  );
};

export default HomePage;
