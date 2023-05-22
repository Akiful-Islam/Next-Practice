import GetAllPaginated from "@/components/page/crud/GetAllPaginated";
import { Page, Query } from "@/types/Page";
import React from "react";

const getData = async (searchParams: Query) => {
  if (Object.keys(searchParams).length === 0) {
    searchParams = {
      page: "0",
      size: "10",
      sort: "id,asc",
    };
  }
  console.log(searchParams);
  console.log(searchParams.sort);
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    params.append(key, value);
  });

  const url = params
    ? `http://localhost:3030/api/employees?${params}`
    : `http://localhost:3030/api/employees`;

  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 400) {
    throw new Error(`Invalid route "${url}".`);
  }
  return res.json();
};

const page = async ({ searchParams }: { searchParams: Query }) => {
  if (Object.keys(searchParams).length === 0) {
    searchParams = {
      page: "0",
      size: "10",
      sort: "id,asc",
    };
  }
  const data: Page = await getData(searchParams);

  return (
    <div className="get-all-root">
      <GetAllPaginated
        page={data}
        employees={data.content}
        searchParams={searchParams}
      />
    </div>
  );
};

export default page;
