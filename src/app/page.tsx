import Button from "@/components/input/Button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="home">
      <Button className="page-button">
        <Link className="button-link" href="/employees">
          Employees
        </Link>
      </Button>
    </div>
  );
};

export default page;
