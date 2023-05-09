import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="home">
      <button className="page-button">
        <Link className="button-link" href="/employees">
          Employees
        </Link>
      </button>
    </div>
  );
};

export default page;
