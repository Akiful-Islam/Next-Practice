type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: "Developer" | "Manager" | "HR" | "QA";
};

export type ResponseEmployee = Employee & {
  id: number;
};

export type PostEmployee = Employee;
export type PatchEmployee = Partial<Employee>;
