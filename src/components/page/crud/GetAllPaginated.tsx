"use client";
import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import QueryForm from "../../input/QueryForm";
import { getAllEmployees } from "@/services/EmployeeServices";
import Button from "../../input/Button";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

const GetAllPaginated = () => {
  const router = useRouter();

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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title="Get All Employees"
        hero={
          <div className="">
            <Button
              className="mx-2 "
              onClick={() => setShowQueryForm(!showQueryForm)}
            >
              Add Query Params?
            </Button>
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
            <Button className="mx-2 " onClick={handleGetAllClick}>
              Show Employees
            </Button>

            {showTable && <EmployeeTable employees={employees} />}
          </div>
        }
        footer={
          <Button title="Back" onClick={() => router.push("/employees")} />
        }
      />
    </div>
  );
};

export default GetAllPaginated;
