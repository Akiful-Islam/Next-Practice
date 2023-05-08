import { Employee } from "@/types/Employee";

type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

const fetchAllEmployees = async (
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

const fetchEmployeeById = async (
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

export { fetchAllEmployees, fetchEmployeeById };
