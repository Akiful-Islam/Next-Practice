import { PatchEmployee, PostEmployee } from "@/types/Employee";

export type Query = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
  name?: string;
  phoneNumber?: string;
};

const getAllEmployees = async (queryParams: Query) => {
  const { pageNumber, pageSize, sortBy, sortDirection, name, phoneNumber } =
    queryParams;

  let url = "http://localhost:3030/api/employees";

  const params = new URLSearchParams();
  if (pageNumber) {
    params.append("page", pageNumber.toString());
  }
  if (pageSize) {
    params.append("size", pageSize.toString());
  }
  if (sortBy) {
    if (sortDirection) {
      params.append("sort", `${sortBy},${sortDirection}`);
    } else {
      params.append("sort", sortBy);
    }
  }
  if (name) {
    params.append("name", name);
  }
  if (phoneNumber) {
    params.append("phoneNumber", phoneNumber);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, { cache: "no-store" });

  return res.json();
};

const getEmployeeById = async (id: number) => {
  const url = `http://localhost:3030/api/employees/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
};

const postEmployee = async (postData: PostEmployee) => {
  const url = `http://localhost:3030/api/employees`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
    cache: "no-store",
  });

  return res.json();
};

const patchEmployee = async (id: number, patchData: PatchEmployee) => {
  const url = `http://localhost:3030/api/employees/${id}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patchData),
    cache: "no-store",
  });

  return res.json();
};

const deleteEmployee = async (id: number) => {
  const url = `http://localhost:3030/api/employees/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (res.status === 404) {
    return res.json();
  }

  if (res.status === 204) {
    return;
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  postEmployee,
  patchEmployee,
  deleteEmployee,
};
