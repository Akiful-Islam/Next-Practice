import { ResponseEmployee } from "@/types/Employee";
import React from "react";
import UpdaterButtons from "../UpdaterButtons";
import { useRouter } from "next/navigation";

type Props = {
  employees: ResponseEmployee[];
  noActions?: boolean;
};

const EmployeeTable: React.FC<Props> = ({ employees, noActions = false }) => {
  const router = useRouter();
  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow-md overflow-hidden rounded-lg border-b border-bnw-blue-gray/20">
        <table className="employee-table min-w-full bg-white">
          <thead className="">
            <tr>
              <th className="">ID</th>
              <th className="">First Name</th>
              <th className="">Last Name</th>
              <th className="">Email</th>
              <th className="">Phone Number</th>
              <th className="">Position</th>
              {!noActions && <th className="">Actions</th>}
            </tr>
          </thead>
          <tbody className=" text-bnw-blue-black divide-y divide-bnw-blue-gray/20">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="cursor-pointer"
                onClick={() => router.push("/employees/get/" + employee.id)}
              >
                <td className="">{employee.id}</td>
                <td className="">{employee.firstName}</td>
                <td className="">{employee.lastName}</td>
                <td className="">{employee.email}</td>
                {!noActions && (
                  <td
                    className="cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <UpdaterButtons employeeId={employee.id} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
