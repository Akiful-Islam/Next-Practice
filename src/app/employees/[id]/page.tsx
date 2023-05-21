import GetById from "@/components/page/crud/GetById";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (id: string) => {
  if (isNaN(parseInt(id))) {
    throw new Error(`Invalid route "${id}". Enter a valid number.`);
  }

  if (parseInt(id) < 1) {
    throw new Error(`Invalid route "${id}". Id starts from 1.`);
  }
  const url = `http://localhost:3030/api/employees/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    notFound();
  }
  return res.json();
};

const EmployeePage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return (
    <div>
      <GetById employee={data} />
    </div>
  );
};

export default EmployeePage;
