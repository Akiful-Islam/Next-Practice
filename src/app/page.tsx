import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="home flex items-center justify-center h-screen">
      <button className="form-button">
        <Link className="button-link" href="/employees">
          Employees
        </Link>
      </button>
    </div>
  );
};

export default page;
