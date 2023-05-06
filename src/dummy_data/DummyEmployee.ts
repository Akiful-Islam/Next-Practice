export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const dummyEmployees: Employee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
  },
];
