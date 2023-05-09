type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

type PostData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type PatchData = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const getAllEmployees = async (queryParams: QueryParams) => {
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

const deleteEmployee = async (
  id: number,
  setEmployeeId: (employeeId: number) => void,
  setemployeeFound: (employeeFound: boolean) => void
) => {
  const url = `http://localhost:3030/api/employees/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((response) => {
      if (response.status === 204) {
        setemployeeFound(true);
        return response.json();
      } else {
        setemployeeFound(false);
        throw new Error("Error deleting employee");
      }
    })
    .then((data) => {
      console.log(data);
      setEmployeeId(0);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export {
  getAllEmployees,
  getEmployeeById,
  postEmployee,
  patchEmployee,
  deleteEmployee,
};
