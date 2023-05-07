"use client";
import { Employee, dummyEmployees } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../EmployeeTable";
import QueryForm from "../QueryForm";

type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

const GetAllButton = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [showTable, setShowTable] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleGetAllClick = () => {
    fetchData({ pageNumber, pageSize, sortBy, sortDirection });
    setShowTable(true);
  };

  const fetchData = async (queryParams: QueryParams) => {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryParams;
    let url = "http://localhost:3030/api/employees";
    const params = new URLSearchParams();
    if (pageNumber) {
      params.append("page", pageNumber.toString());
    }
    if (pageSize) {
      params.append("size", pageSize.toString());
    }
    if (sortBy) {
      if (sortDirection) {
        params.append("sort", `${sortBy},${sortDirection}`);
      } else {
        params.append("sort", sortBy);
      }
    }
    if (params.toString()) {
      console.log(url);
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.content);
      });
  };
  return (
    <div className="get-all">
      <h2>Get All</h2>
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

export default GetAllButton;
