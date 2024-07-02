import React, { useEffect, useState } from "react";
import DefaultSidebar from "../../components/DefaultSidebar";
import dayjs from "dayjs";
import { FaLocationArrow } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { TbTargetOff } from "react-icons/tb";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import { IoPerson } from "react-icons/io5";
import spinner from "../../assets/spinner.svg";
import { supabase } from "../../config/supabase-client";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskCard from "./components/TaskCard";

function EmployeeProfile() {
  const [datevalue, setDatevalue] = useState(dayjs());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [taskStatus, setTaskStatus] = useState("toComplete");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const employeeTasks = async () => {
      const { data, error } = await supabase
        .from("employee_tasks")
        .select("*")
        .eq("assigned_to_id", id);

      if (error) {
        console.log(error);
      } else {
        setTasks(data);
        setIsLoading(false);
        console.log(data);
      }
    };

    employeeTasks();
  }, [id]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.status === taskStatus &&
      dayjs(task.completion_date).isSame(dayjs(datevalue), "day")
  );

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white ">
          <img src={spinner} alt="Loading..." />
        </div>
      )}

      {isPhone ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-800 text-xl">
            Admin portal only visible on laptops not on mobile versions
          </p>
        </div>
      ) : (
        <div className="hidden lg:flex flex-row">
          <DefaultSidebar collapsable={true} />
          <div
            className="flex w-full py-4"
            style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}
          >
            <div className="w-full lg:w-1/3 pl-4 pr-2">
              <div
                className="bg-blue-500 text-white px-3 py-1.5 w-full text-start rounded-md mb-2 flex items-center"
                onClick={() => navigate("/employee-list")}
              >
                <IoIosArrowRoundBack size={24} className="mr-2" />
                <button>Go Back</button>
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
                    <div className="bg-blue-500 text-white px-2 py-1 w-fit text-start rounded-md flex items-center">
                      <FiPlus size={20} className="mr-2" />
                      <button>Add Task</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex space-x-2 w-fit mb-4 justify-center rounded-full shadow-custom-light text-xs p-1">
                      <button
                        className={`${
                          taskStatus === "toComplete"
                            ? "bg-red-500 text-white "
                            : "text-gray-800"
                        } px-4 py-2 rounded-full`}
                        onClick={() => setTaskStatus("toComplete")}
                      >
                        To complete
                      </button>
                      <button
                        className={`${
                          taskStatus === "inProgress"
                            ? "bg-red-500 text-white "
                            : "text-gray-800"
                        } px-4 py-2 rounded-full`}
                        onClick={() => setTaskStatus("inProgress")}
                      >
                        In Progress
                      </button>
                      <button
                        className={`${
                          taskStatus === "completed"
                            ? "bg-red-500 text-white "
                            : "text-gray-800"
                        } px-4 py-2 rounded-full`}
                        onClick={() => setTaskStatus("completed")}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-600 mb-4">
                    <span className="font-semibold">
                      Due {datevalue.format("MMMM D, YYYY")}
                    </span>{" "}
                  </div>
                  {tasks ? (
                    <TaskCard
                      tasks={tasks}
                      taskStatus={taskStatus}
                      datevalue={datevalue}
                    />
                  ) : (
                    // Optional: Render a placeholder or loading indicator here
                    <div>Loading...</div>
                  )}{" "}
                </div>
                <div className="bg-white rounded shadow-custom-light p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Attendance</h2>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateCalendar", "DateCalendar"]}
                      >
                        <DemoItem>
                          <DateCalendar
                            disableFuture
                            value={datevalue}
                            onChange={(newValue) => setDatevalue(newValue)}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
