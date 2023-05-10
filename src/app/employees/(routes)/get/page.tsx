import GetAllPaginated from "@/components/crud/GetAllPaginated";
import EmployeeTable from "@/components/data/EmployeeTable";
import React from "react";

const page = () => {
  return (
    <div className="get-all-root">
      <h1 className="">Get All Employees</h1>
      <EmployeeTable />
    </div>
  );
};

export default page;
