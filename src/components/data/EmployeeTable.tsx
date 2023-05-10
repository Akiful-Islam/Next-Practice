import React from "react";

type Props = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const EmployeeTable: React.FC<Props> = ({ style, className, children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Matches Schedule
          </h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Home
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Res.
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Res.
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Away
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Team 1
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      0
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      3
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div className="flex items-center float-right">
                      <div className="mr-3">
                        <p className="text-gray-900 whitespace-no-wrap text-right">
                          Team 2
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell"></div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Team 3
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      0
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      3
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div className="flex items-center float-right">
                      <div className="mr-3">
                        <p className="text-gray-900 whitespace-no-wrap text-right">
                          Team 4
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
