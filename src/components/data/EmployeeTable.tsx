import { Employee } from "@/types/Employee";
import React, { useState } from "react";
import Button from "../input/Button";
import UpdaterButtons from "../UpdaterButtons";
import { useRouter } from "next/navigation";

type Props = {
  employees: Employee[];
};

const EmployeeTable: React.FC<Props> = ({ employees }) => {
  const router = useRouter();
  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow-md overflow-hidden rounded-lg border-b border-bnw-blue-gray/20">
        <table className="employee-table min-w-full bg-white">
          <thead className="">
            <tr>
              <th className="w-1/3 ">ID</th>
              <th className="w-1/3 ">First Name</th>
              <th className="">Last Name</th>
              <th className="">Email</th>
              <th className="min-w-44">Update</th>
            </tr>
          </thead>
          <tbody className=" text-bnw-blue-black divide-y divide-bnw-blue-gray/20">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="cursor-pointer"
                onClick={() => router.push("/employees/get/" + employee.id)}
              >
                <td className="w-1/3 ">{employee.id}</td>
                <td className="w-1/3 ">{employee.firstName}</td>
                <td className="">{employee.lastName}</td>
                <td className="">{employee.email}</td>
                <td className="">
                  <UpdaterButtons id={employee.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
