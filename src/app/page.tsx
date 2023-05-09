import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <button>
      <Link href="/employees">Employees</Link>
    </button>
  );
};

export default page;
