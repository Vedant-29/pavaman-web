import React, { useEffect, useState } from "react";
import DefaultSidebar from "../../components/DefaultSidebar";
import dayjs from "dayjs";
import { FaLocationArrow } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { LuTarget } from "react-icons/lu";
import { TbTargetOff } from "react-icons/tb";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import spinner from "../../assets/spinner.svg";


function EmployeeProfile() {
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [taskStatus, setTaskStatus] = useState("toComplete");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
        {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white ">
          <img src={spinner} />
        </div>
      )}
      {/* Responsive layout for phones */}
      <div className="block lg:hidden">
        <div className="flex flex-col">
          <div
            className={`fixed z-20 bg-white h-full w-64 ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <DefaultSidebar />
          </div>
          <div
            className="flex flex-col w-full py-4"
            style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}
          >
            <div className="w-fit rounded-md mb-4 lg:hidden ml-4 p-2 shadow-custom-light ">
              <button
                className="text-gray-800 p-2 focus:outline-none"
                onClick={toggleSidebar}
              >
                <RxHamburgerMenu size={24} />
              </button>
            </div>

            <div className="w-full pl-4 pr-4 md:pr-2 mb-4">
              <div className="bg-white rounded-md p-6 text-center shadow-custom-light">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-full mx-auto mb-4 w-32 h-32"
                />
                <h5 className="text-xl font-semibold mb-1">John Smith</h5>
                <p className="text-gray-600 mb-2">+91 00000 000000</p>
                <p className="text-gray-600 mb-4">example@gmail.com</p>
                <div className="flex justify-center mb-2">
                  <button className="bg-transparent border border-green-500 text-green-500 py-2 px-4 rounded ml-2">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full px-4 mb-4">
              <div className="bg-white rounded shadow-custom-light p-6 h-96 flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/600x200"
                  alt="banner"
                  className="w-full h-80 object-cover rounded"
                />
              </div>
            </div>

            <div className="w-full pl-4 pr-4 md:pr-2 mb-4">
              <div className="bg-white rounded shadow-custom-light p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="flex justify-between items-center py-3">
                    <span className="text-yellow-500 flex items-center">
                      <IoPerson className="mr-2" />
                      Role
                    </span>
                    <span className="text-gray-600">
                      Salesman-North division
                    </span>
                  </li>
                  <li className="flex justify-between items-center py-3">
                    <span className="text-blue-800 flex items-center">
                      <FaLocationArrow className="mr-2" />
                      Last Location
                    </span>
                    <span className="text-gray-600">
                      Cannaught Place, Delhi
                    </span>
                  </li>
                  <li className="flex justify-between items-center py-3">
                    <span className="text-green-400 flex items-center">
                      <LuTarget className="mr-2" />
                      Targets Completed
                    </span>
                    <span className="text-gray-600">10</span>
                  </li>
                  <li className="flex justify-between items-center py-3">
                    <span className="text-red-400 flex items-center">
                      <TbTargetOff className="mr-2" />
                      Targets Pending
                    </span>
                    <span className="text-gray-600">2</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full pl-4 pr-4 md:pr-2 mb-4">
              <div className="bg-white rounded shadow-custom-light mb-4 p-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar"]}>
                    <DemoItem>
                      <div className="flex justify-center items-center">
                        <DateCalendar
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </div>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            <div className="w-full px-4">
              <div className="bg-white rounded shadow-custom-light p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Tasks</h2>
                  <div className="flex space-x-2 rounded-full shadow-custom-light text-xs p-1">
                    <button
                      className={`${
                        taskStatus === "toComplete"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-3 py-2 rounded-full`}
                      onClick={() => setTaskStatus("toComplete")}
                    >
                      To complete
                    </button>
                    <button
                      className={`${
                        taskStatus === "inProgress"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-3 py-2 rounded-full`}
                      onClick={() => setTaskStatus("inProgress")}
                    >
                      In Progress
                    </button>
                    <button
                      className={`${
                        taskStatus === "completed"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-3 py-2 rounded-full`}
                      onClick={() => setTaskStatus("completed")}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="text-gray-600 mb-4">
                  <span className="font-semibold">Due. Today, Monday 17</span>
                </div>
                <div
                  id="scrollbar"
                  className="space-y-4 overflow-auto max-h-60"
                >
                  <div className="bg-blue-100 p-4 rounded-md border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className="text-blue-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM3 12a9 9 0 1118 0A9 9 0 013 12z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">10:30 AM - 11:30 AM</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Programming
                    </h3>
                    <p className="text-gray-600">
                      Create a unique emotional story that describes better than
                      words
                    </p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-md border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className="text-blue-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM3 12a9 9 0 1118 0A9 9 0 013 12z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">10:30 AM - 11:30 AM</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Programming
                    </h3>
                    <p className="text-gray-600">
                      Create a unique emotional story that describes better than
                      words
                    </p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-md border border-red-200">
                    <div className="flex items-center mb-2">
                      <div className="text-red-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c.58-1.78 1.85-3 3.5-3 1.88 0 3.41 1.37 3.5 3.5v.05C19.93 11.41 17.76 14 15 14c-2.05 0-3.67-1.21-4.4-2.92"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">11:30 AM - 12:30 PM</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Math
                    </h3>
                    <p className="text-gray-600">
                      Create a unique emotional story that describes better than
                      words
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original layout for tablets and laptops */}
      <div className="hidden lg:flex flex-row">
        <DefaultSidebar />
        <div
          className="flex w-full py-4"
          style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}
        >
          <div className="w-full lg:w-1/3 pl-4 pr-2">
            <div className="bg-blue-500 text-white px-3 py-1.5 w-full text-start rounded-md mb-2 flex items-center" onClick={() => navigate("/employee-list")}>
              <IoIosArrowRoundBack size={24} className="mr-2"/> 
              <button>
                Go Back
              </button>
            </div>
            <div className="bg-white rounded-md p-6 text-center shadow-custom-light">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-full mx-auto mb-4 w-32 h-32"
              />
              <h5 className="text-xl font-semibold mb-1">John Smith</h5>
              <p className="text-gray-600 mb-2">+91 00000 000000</p>
              <p className="text-gray-600 mb-4">example@gmail.com</p>
              <div className="flex justify-center mb-2">
                <button className="bg-transparent border border-green-500 text-green-500 py-2 px-4 rounded ml-2">
                  Message
                </button>
              </div>
            </div>

            <div className="bg-white rounded shadow-custom-light p-6 mt-4">
              <ul className="divide-y divide-gray-200">
                <li className="flex justify-between items-center py-3">
                  <span className="text-yellow-500 flex items-center">
                    <IoPerson className="mr-2" />
                    Role
                  </span>
                  <span className="text-gray-600">Salesman-North division</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-blue-800 flex items-center">
                    <FaLocationArrow className="mr-2" />
                    Last Location
                  </span>
                  <span className="text-gray-600">Cannaught Place, Delhi</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-green-400 flex items-center">
                    <LuTarget className="mr-2" />
                    Targets Completed
                  </span>
                  <span className="text-gray-600">10</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-red-400 flex items-center">
                    <TbTargetOff className="mr-2" />
                    Targets Pending
                  </span>
                  <span className="text-gray-600">2</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-2/3 pl-2 pr-2">
            <div className="bg-white rounded shadow-custom-light p-6 mb-4 h-96 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/600x200"
                alt="banner"
                className="w-full h-80 object-cover rounded"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded shadow-custom-light p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Tasks</h2>
                  <div className="flex space-x-2 rounded-full shadow-custom-light text-xs p-1">
                    <button
                      className={`${
                        taskStatus === "toComplete"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-3 py-2 rounded-full`}
                      onClick={() => setTaskStatus("toComplete")}
                    >
                      To complete
                    </button>
                    <button
                      className={`${
                        taskStatus === "inProgress"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-3 py-2 rounded-full`}
                      onClick={() => setTaskStatus("inProgress")}
                    >
                      In Progress
                    </button>
                    <button
                      className={`${
                        taskStatus === "completed"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-3 py-2 rounded-full`}
                      onClick={() => setTaskStatus("completed")}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="text-gray-600 mb-4">
                  <span className="font-semibold">Due. Today, Monday 17</span>
                </div>
                <div
                  id="scrollbar"
                  className="space-y-4 overflow-auto max-h-60"
                >
                  <div className="bg-blue-100 p-4 rounded-md border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className="text-blue-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM3 12a9 9 0 1118 0A9 9 0 013 12z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">10:30 AM - 11:30 AM</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Programming
                    </h3>
                    <p className="text-gray-600">
                      Create a unique emotional story that describes better than
                      words
                    </p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-md border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className="text-blue-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM3 12a9 9 0 1118 0A9 9 0 013 12z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">10:30 AM - 11:30 AM</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Programming
                    </h3>
                    <p className="text-gray-600">
                      Create a unique emotional story that describes better than
                      words
                    </p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-md border border-red-200">
                    <div className="flex items-center mb-2">
                      <div className="text-red-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c.58-1.78 1.85-3 3.5-3 1.88 0 3.41 1.37 3.5 3.5v.05C19.93 11.41 17.76 14 15 14c-2.05 0-3.67-1.21-4.4-2.92"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600">11:30 AM - 12:30 PM</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Math
                    </h3>
                    <p className="text-gray-600">
                      Create a unique emotional story that describes better than
                      words
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow-custom-light p-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar"]}>
                    <DemoItem>
                      <div className="flex justify-center items-center">
                        <DateCalendar
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </div>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
