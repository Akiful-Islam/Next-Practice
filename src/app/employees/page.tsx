import Card from "@/components/Card";
import Button from "@/components/input/Button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="">Employees</h1>
      <Card>
        <div className="employees-root flex flex-col w-80 h-96 justify-center">
          <Button className="page-button">
            <Link href="/employees/get">Get All</Link>
          </Button>
          <Button type="transparent" className="page-button">
            <Link href="/employees/get/{id}">Get by Id</Link>
          </Button>
          <Button className="page-button">
            <Link href="/employees/post">Create</Link>
          </Button>
          <Button type="transparent" className="page-button">
            <Link href="/employees/patch/">Update</Link>
          </Button>
          <Button className="page-button">
            <Link href="/employees/delete/">Delete</Link>
          </Button>
        </div>
      </Card>
      <Button className="place-self-end">
        <Link href="/">Back</Link>
      </Button>
    </div>
  );
};

export default page;
