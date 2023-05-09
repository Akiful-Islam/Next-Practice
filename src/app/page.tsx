import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="home flex items-center justify-center h-screen">
      <button className="self-center w-48 h-14 text-4xl font-extrabold bg-slate-100 rounded-xl">
        <Link className="bg-transparent text-slate-800" href="/employees">
          Employees
        </Link>
      </button>
    </div>
  );
};

export default page;
