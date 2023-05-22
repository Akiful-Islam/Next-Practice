import PatchById from "@/components/page/crud/PatchById";
import { EmployeePosition, PatchEmployee } from "@/types/Employee";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (id: string) => {
  if (isNaN(Number(id))) {
    throw new Error(`Invalid route "${id}". Enter a valid number.`);
  }
  if (Number(id) < 1) {
    throw new Error(`Invalid route "${id}". Id starts from 1.`);
  }

  const url = `http://localhost:3030/api/employees/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) {
    notFound();
  }
  return res.json();
};

const EditPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return <PatchById employee={data} />;
};

export default EditPage;
