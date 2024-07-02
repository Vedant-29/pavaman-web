import React, { useEffect, useState } from "react";
import DefaultSidebar from "../../components/DefaultSidebar";
import { supabase } from "../../config/supabase-client";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg";

const StatsCard = ({ title, value, color }) => {
  return (
    <div
      className={`mt-0 sm:mt-0 p-3 flex items-center bg-[${color}] rounded-md`}
    >
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

function EmployeePage() {
  const [employeeList, setemployeeList] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      const { data, error } = await supabase.from("employee_users").select("*");

      if (error) {
        console.log(error.message);
      } else {
        setemployeeList(data);
        setIsLoading(false);
      }
    };
    fetchEmployeeList();
  }, []);

  return (
    <div>
      <div className="hidden lg:flex flex-row">
        {" "}
        {/* Hide on mobile */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white ">
            <img src={spinner} alt="Loading..." />
          </div>
        )}
        <DefaultSidebar />
        <div
          className="flex-1 p-6"
          style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Total Salesman"
              value="$76,96,432"
              color="#EBE8FD"
            />
            <StatsCard title="Targets Completed" value="1645" color="#EBE8FD" />
            <StatsCard title="Targets Pending" value="14,634" color="#EBE8FD" />
            {/* <StatsCard
            title="Total Products"
            value="254"
            color="#EBE8FD"
          /> */}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-row w-full space-x-2">
              <input
                type="text"
                className="flex-grow py-1 px-4 rounded-md border border-[#E6E6E6] outline-none focus:bg-[#F3F3F3]"
                placeholder="Search..."
                style={{ caretColor: "#C5C5C5" }}
              />
              <div>
                <button className="py-1 px-3 bg-blue-500 text-white rounded-md flex-shrink-0">
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white mb-8 p-4 mt-0 sm:mt-0 shadow-custom-light transition-shadow duration-300 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-[#F4F4F4]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeList.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.employee_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.phoneNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() =>
                          navigate(`/employee-profile/${employee.employee_id}`)
                        }
                        className="py-1 px-4 bg-[#D7FFDE] text-[#00B69B] font-medium rounded-md flex-shrink-0"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-screen lg:hidden">
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="text-lg flex items-center justify-center text-center font-medium mb-3 px-6 py-4 shadow-custom-light relative">
              <div>Admin Portal Unavailable on Mobile Devices</div>
            </div>
            <div className="flex flex-col items-center justify-center mb-4 px-6">
              <div className="text-center">
                Please switch to a laptop or desktop to access the admin portal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
