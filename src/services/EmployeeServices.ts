export type Query = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
};

type PostData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: "Developer" | "Manager" | "HR" | "QA";
};

export type PatchData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  position?: "Developer" | "Manager" | "HR" | "QA";
};

const getAllEmployees = async (queryParams: Query) => {
  const { pageNumber, pageSize, sortBy, sortDirection } = queryParams;

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

const postEmployee = async (postData: PostData) => {
  const url = `http://localhost:3030/api/employees`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
    cache: "no-store",
  });

  return res.json();
};

const patchEmployee = async (id: number, patchData: PatchData) => {
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
