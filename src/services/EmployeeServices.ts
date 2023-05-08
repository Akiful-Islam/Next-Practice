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
  id: string,
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

export { getAllEmployees, getEmployeeById, postEmployee };
