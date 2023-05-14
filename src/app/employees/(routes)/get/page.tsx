import GetAllPaginated from "@/components/page/crud/GetAllPaginated";
import React from "react";

const page = () => {
  return (
    <div className="get-all-root">
      <h1 className="">Get All Employees</h1>
      <GetAllPaginated />
    </div>
  );
};

export default page;
