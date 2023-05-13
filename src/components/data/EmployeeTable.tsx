import { Employee } from "@/types/Employee";
import React from "react";

type Props = {
  employees: Employee[];
};

const EmployeeTable: React.FC<Props> = ({ employees }) => {
  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow-md overflow-hidden rounded-lg border-b border-bnw-blue-gray/20">
        <table className="min-w-full bg-white">
          <thead className="bg-bnw-blue-gray/10 text-bnw-blue-black">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                ID
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                First Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Last Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="text-zinc-700 divide-y divide-bnw-blue-gray/20">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="w-1/3 text-left py-3 px-4">{employee.id}</td>
                <td className="w-1/3 text-left py-3 px-4">
                  {employee.firstName}
                </td>
                <td className="text-left py-3 px-4">{employee.lastName}</td>
                <td className="text-left py-3 px-4">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
