import GetById from "@/components/page/crud/GetById";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (id: string) => {
  if (isNaN(Number(id))) {
    throw new Error(
      `Invalid route "${id}". Enter a valid number. or did you mean all?`
    );
  }

  if (Number(id) < 1) {
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
