"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../data/EmployeeTable";
import QueryForm from "../QueryForm";
import { getAllEmployees } from "@/services/EmployeeServices";

const GetAllPaginated = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [showTable, setShowTable] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleGetAllClick = async () => {
    const response = await getAllEmployees({
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    });

    setEmployees(response.content);
    setShowTable(true);
  };

  return (
    <div className="get-all-component">
      <button onClick={() => setShowQueryForm(!showQueryForm)}>
        Add Query Params?
      </button>
      {showQueryForm && (
        <QueryForm
          pageNumber={pageNumber}
          pageSize={pageSize}
          sortBy={sortBy}
          sortDirection={sortBy}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
        />
      )}
      <button onClick={handleGetAllClick}>Show Employees</button>

      {showTable && <EmployeeTable employees={employees} />}
    </div>
  );
};

export default GetAllPaginated;
