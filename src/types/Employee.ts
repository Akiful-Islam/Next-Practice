type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: EmployeePosition;
};

export enum EmployeePosition {
  DEVELOPER = "Developer",
  MANAGER = "Manager",
  HR = "HR",
  QA = "QA",
}

export type ResponseEmployee = Employee & {
  id: number;
};

export type PostEmployee = Employee;
export type PatchEmployee = Partial<Employee>;
