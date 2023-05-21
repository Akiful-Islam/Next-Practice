import DeleteById from "@/components/page/crud/DeleteById";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (id: string) => {
  if (isNaN(Number(id))) {
    throw new Error(`Invalid route "${id}". Enter a valid number.`);
  }

  if (parseInt(id) < 1) {
    throw new Error(`Invalid route "${id}". Id starts from 1.`);
  }
  const url = `http://localhost:3030/api/employees/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) {
    notFound();
  }
  fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return res.json();
};

const DeletePage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return (
    <div>
      <DeleteById deletedEmployee={data} />
    </div>
  );
};

export default DeletePage;
