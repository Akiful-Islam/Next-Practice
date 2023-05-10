import Card from "@/components/Card";
import Button from "@/components/input/Button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Card>
      <div className="employees-root flex flex-col">
        <Button type="filled" className="page-button">
          <Link href="/employees/get">Get All</Link>
        </Button>
        <Button type="transparent" className="page-button">
          <Link href="/employees/get/{id}">Get by Id</Link>
        </Button>
        <Button type="filled" className="page-button">
          <Link href="/employees/post">Create</Link>
        </Button>
        <Button type="transparent" className="page-button">
          <Link href="/employees/patch/">Update</Link>
        </Button>
        <Button type="filled" className="page-button">
          <Link href="/employees/delete/">Delete</Link>
        </Button>
      </div>
    </Card>
  );
};

export default page;
