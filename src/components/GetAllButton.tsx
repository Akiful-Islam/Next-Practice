"use client";
import { Employee, dummyEmployees } from "@/dummy_data/DummyEmployee";
import React, { useState } from "react";
import EmployeeTable from "./EmployeeTable";

type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

const GetAllButton = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [showTable, setShowTable] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);

  const buttonStyle = {
    border: 12,
    padding: 8,
    background: "white",
    borderRadius: 6,
    color: "black",
  };

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
      url += `?${params.toString()}`;
    }

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setEmployees(data.content);
      });
  };
  return (
    <div className="get-all">
      <h2>Get All</h2>
      <button
        onClick={() => setShowQueryForm(!showQueryForm)}
        style={buttonStyle}
      >
        Add Query Params?
      </button>
      {showQueryForm && (
        <div>
          <div>
            <label htmlFor="page-size">Page Size:</label>
            <input
              style={{
                width: 64,
                height: 36,
                color: "black",
                borderRadius: 6,
                margin: 8,
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              id="page-size"
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="page-number">Page Number:</label>
            <input
              style={{
                width: 64,
                height: 36,
                color: "black",
                borderRadius: 6,
                margin: 8,
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              id="page-number"
              type="number"
              value={pageNumber}
              onChange={(e) => setPageNumber(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="sort-by">Sort By:</label>
            <select
              style={{
                width: 64,
                height: 36,
                color: "black",
                borderRadius: 6,
                margin: 8,
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="id">Id</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort-order">Sort Order:</label>
            <select
              style={{
                width: 64,
                height: 36,
                color: "black",
                borderRadius: 6,
                margin: 8,
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              id="sort-order"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>
      )}
      <button onClick={handleGetAllClick} style={buttonStyle}>
        Show Employees
      </button>

      {showTable && <EmployeeTable employees={employees} />}
    </div>
  );
};

export default GetAllButton;
