import PatchById from "@/components/page/crud/PatchById";
import { EmployeePosition, PatchEmployee } from "@/types/Employee";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (id: string, patchData: PatchEmployee) => {
  if (isNaN(Number(id))) {
    throw new Error(`Invalid route "${id}". Enter a valid number.`);
  }

  if (Number(id) < 1) {
    throw new Error(`Invalid route "${id}". Id starts from 1.`);
  }

  const url = `http://localhost:3030/api/employees/${id}`;

  if (
    !(
      patchData.firstName ||
      patchData.lastName ||
      patchData.email ||
      patchData.phoneNumber ||
      patchData.position
    )
  ) {
    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 404) {
      notFound();
    }
    return res.json();
  } else {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchData),
      cache: "no-store",
    });
    return res.json();
  }
};

const EditPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    position?: EmployeePosition;
  };
}) => {
  const data = await getData(params.id, searchParams);
  return <PatchById employee={data} />;
};

export default EditPage;
