"use client";
import { ResponseEmployee } from "@/types/Employee";
import React, { useEffect, useState } from "react";
import EmployeeTable from "../../data/EmployeeTable";
import QueryForm from "../../input/QueryForm";
import Button from "../../input/Button";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { Page, Query } from "@/types/Page";
import Selector from "@/components/input/Selector";
import Input from "@/components/input/Input";

type Props = {
  page: Page;
  employees: ResponseEmployee[];
  searchParams: Query;
};

const GetAllPaginated: React.FC<Props> = ({
  page,
  employees,
  searchParams,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(searchParams);
  const [searchBy, setSearchBy] = useState<"name" | "phoneNumber">("name");
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (searchBy === "name") {
      setQuery({ ...query, name: e.target.value });
    }
    if (searchBy === "phoneNumber") {
      setQuery({ ...query, phoneNumber: e.target.value });
    }
  };

  const reRender = (query: Query) => {
    const params = new URLSearchParams();
    if (query.page) {
      params.append("page", query.page.toString());
    }
    if (query.size) {
      params.append("size", query.size.toString());
    }
    if (query.sort) {
      params.append("sort", query.sort);
    }
    if (query.name) {
      params.append("name", query.name);
    }
    if (query.phoneNumber) {
      params.append("phoneNumber", query.phoneNumber);
    }
    router.push(`/employees/all?${params.toString()}`);
  };

  useEffect(() => {
    reRender(query);
  }, [query]);

  useEffect(() => {
    setSearch("");
    setQuery({ ...query, name: undefined, phoneNumber: undefined });
  }, [searchBy]);

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
      <div className="w-screen flex flex-col justify-center items-center">
        <QueryForm
          pageNumber={query.page}
          pageSize={query.size}
          sortBy={query.sort}
          sortDirection={query.sort && query.sort.split(",")[1]}
          setPageNumber={(page) => setQuery({ ...query, page })}
          setPageSize={(size) => setQuery({ ...query, size })}
          setSortBy={(sort) => setQuery({ ...query, sort })}
          setSortDirection={(sortDirection) =>
            setQuery({
              ...query,
              sort: `${query.sort?.split(",")[0]},${sortDirection}`,
            })
          }
        />

        <div className="flex justify-center items-center al w-1/3">
          <Input
            className="w-64"
            label="Search"
            value={search}
            onChange={handleSearch}
            type={searchBy === "phoneNumber" ? "number" : "text"}
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

      {employees.length > 0 ? (
        <EmployeeTable employees={employees} />
      ) : (
        page &&
        (search ? (
          <Card
            hero={
              <p className="text-lg font-medium text-bnw-blue-black animate-pulse pt-4">
                No results found
              </p>
            }
          />
        ) : (
          <Card
            hero={
              <p className="text-lg font-medium text-bnw-blue-black animate-pulse pt-4">
                Seems like the page is empty
              </p>
            }
          />
        ))
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
