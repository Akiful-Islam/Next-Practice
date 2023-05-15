"use client";
import { Employee } from "@/types/Employee";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import QueryForm from "../../input/QueryForm";
import { Query, getAllEmployees } from "@/services/EmployeeServices";
import Button from "../../input/Button";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

const GetAllPaginated = () => {
  const router = useRouter();

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [query, setQuery] = useState<Query>({
    pageNumber: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "asc",
  });

  const fetchAllEmployees = async () => {
    const response = await getAllEmployees(query);

    setEmployees(response.content);
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [query]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <Card
        title="Get All Employees"
        hero={
          <QueryForm
            pageNumber={query.pageNumber}
            pageSize={query.pageSize}
            sortBy={query.sortBy}
            sortDirection={query.sortDirection}
            setPageNumber={(pageNumber) => setQuery({ ...query, pageNumber })}
            setPageSize={(pageSize) => setQuery({ ...query, pageSize })}
            setSortBy={(sortBy) => setQuery({ ...query, sortBy })}
            setSortDirection={(sortDirection) =>
              setQuery({ ...query, sortDirection })
            }
          />
        }
        footer={
          <Button title="Back" onClick={() => router.push("/employees")} />
        }
      />
      {employees.length > 0 ? (
        <EmployeeTable employees={employees} />
      ) : (
        <p>Seems the table is empty</p>
      )}
    </div>
  );
};

export default GetAllPaginated;
