"use client";
import { ResponseEmployee } from "@/types/Employee";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import QueryForm from "../../input/QueryForm";
import { Query, getAllEmployees } from "@/services/EmployeeServices";
import Button from "../../input/Button";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { Page } from "@/types/Page";
import Selector from "@/components/input/Selector";
import Input from "@/components/input/Input";

const GetAllPaginated = () => {
  const router = useRouter();

  const [employees, setEmployees] = useState<ResponseEmployee[]>([]);
  const [page, setPage] = useState<Page | null>(null);
  const [searchBy, setSearchBy] = useState<"name" | "phoneNumber">("name");
  const [search, setSearch] = useState("");

  const [query, setQuery] = useState<Query>({
    pageNumber: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "asc",
  });

  const [loading, setLoading] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (searchBy === "name") {
      setQuery({ ...query, name: e.target.value });
    }
    if (searchBy === "phoneNumber") {
      setQuery({ ...query, phoneNumber: e.target.value });
    }
  };

  const fetchAllEmployees = async () => {
    const response = await getAllEmployees(query);
    setPage(response);
    setEmployees(response.content);
    setLoading(false);
    console.log(searchBy);
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [query]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-6">
      <h1 className="text-6xl font-bold text-bnw-blue-black my-10 transition-colors ease-in-out duration-100 hover:text-bnw-blue-gray">
        Employees
      </h1>

      <Button
        className="my-10"
        title="Add New Employee"
        onClick={() => router.push("employees/post")}
      />

      {page ? (
        <div className="w-screen flex flex-col justify-center items-center">
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

          <div className="flex justify-center items-center al w-1/3">
            <Input
              className="w-64"
              label="Search"
              value={search}
              onChange={handleSearch}
            />
            <Selector
              className="w-24"
              label="Search By"
              value={searchBy ? searchBy : undefined}
              onChange={(e) =>
                setSearchBy(e.target.value as "name" | "phoneNumber")
              }
              options={[
                { value: "name", label: "Name" },
                { value: "phoneNumber", label: "Phone" },
              ]}
            />
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-lg font-medium text-red-400 animate-pulse pt-4">
            No content exists :(
          </p>
        )
      )}

      {employees.length > 0 ? (
        <EmployeeTable employees={employees} />
      ) : (
        page &&
        page.totalElements > 0 && (
          <Card
            hero={
              <p className="text-lg font-medium text-bnw-blue-black animate-pulse pt-4">
                Seems like the page is empty
              </p>
            }
          />
        )
      )}
      <Button
        className="!h-8 !w-16 !text-sm font-medium"
        variant="transparent"
        title="Back"
        onClick={() => router.push("/employees")}
      />
    </div>
  );
};

export default GetAllPaginated;
