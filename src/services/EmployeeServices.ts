import { Employee } from "@/types/Employee";

type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

type PostFields = {
  firstName: string;
  lastName: string;
  email: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setError: (error: string) => void;
  setPostedEmployee: (employee: Employee | null) => void;
};

export type PatchData = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

type PatchFields = {
  patchData: PatchData;
  employeeId: number;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPatchedEmployee: (employee: Employee | null) => void;
  setError: (error: string) => void;
};

const getAllEmployees = async (
  queryParams: QueryParams,
  setEmployees: (employees: Employee[]) => void
) => {
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
    console.log(url);
    url += `?${params.toString()}`;
  }

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setEmployees(data.content);
    });
};

const getEmployeeById = async (
  id: number,
  setEmployee: (employee: Employee | null) => void
) => {
  const url = `http://localhost:3030/api/employees/${id}`;
  await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setEmployee(null);
        throw new Error("Employee not found");
      }
    })
    .then((data) => {
      setEmployee(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const postEmployee = async (postFields: PostFields) => {
  const {
    firstName,
    lastName,
    email,
    setFirstName,
    setLastName,
    setEmail,
    setError,
    setPostedEmployee,
  } = postFields;
  const url = `http://localhost:3030/api/employees`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setPostedEmployee(null);
        throw new Error("Error adding employee");
      }
    })
    .then((data) => {
      console.log(data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setError("");
      setPostedEmployee(data);
    })
    .catch((err) => {
      setError(err.message);
    });
};

const patchEmployee = async (patchFields: PatchFields) => {
  const {
    patchData,
    employeeId,
    setFirstName,
    setLastName,
    setEmail,
    setPatchedEmployee,
    setError,
  } = patchFields;

  const url = `http://localhost:3030/api/employees/${employeeId}`;
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setPatchedEmployee(null);
        throw new Error("Error patching employee");
      }
    })
    .then((data) => {
      console.log(data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPatchedEmployee(data);
    })
    .catch((err) => {
      console.log(err);

      setError(err.message);
    });
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
