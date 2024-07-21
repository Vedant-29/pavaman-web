import React, { useEffect, useState, useRef } from "react";
import DefaultSidebar from "../../components/DefaultSidebar";
import dayjs from "dayjs";
import { FaLocationArrow } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { TbTargetOff } from "react-icons/tb";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import { IoPerson } from "react-icons/io5";
import spinner from "../../assets/spinner.svg";
import { supabase } from "../../config/supabase-client";
import TaskCard from "./components/TaskCard";

import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import trees from "./../../pages/TestGoogleMaps/data/trees";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useAuth } from "../../hooks/auth";

const Markers = ({ points }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker
          position={point}
          key={index}
          ref={(marker) => setMarkerRef(marker, index)}
        >
          <span style={{ fontSize: "2rem" }}>🌳</span>
        </AdvancedMarker>
      ))}
    </>
  );
};

function EmployeeProfile() {
  const [datevalue, setDatevalue] = useState(dayjs());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const {user} = useAuth();

  const [taskStatus, setTaskStatus] = useState("To complete");
  const [tasks, setTasks] = useState([]);

  const [userProf, setUserProf] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentUserprof, setCurrentUserProf] = useState([]);

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
      }
    };

    const employeeInfo = async () => {
      const { data, error } = await supabase
        .from("employee_users")
        .select("*")
        .eq("role_assigned_by", user.id);

      if (error) {
        console.log(error);
      } else {
        setUserProf(data);
        console.log("This is the users data", data);
        const userLocations = data.map(user => ({
          lat: user.latitude,
          lng: user.longitude
        }));
        setLocations(userLocations);
        console.log(userLocations);
      }
    };

    const currentEmployeeInfo = async () => {
      const { data, error } = await supabase
      .from("employee_users")
      .select("*")
      .eq("employee_id", id).single();

      if (error) {
        console.log(error);
      } else {
        setCurrentUserProf(data);
      }

    }

    currentEmployeeInfo();
    employeeInfo();
    employeeTasks();
  }, [id]);

  const [open, setOpen] = useState(false);

  const position = {
    lat: 17.366,
    lng: 78.476,
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white ">
          <img src={spinner} alt="Loading..." />
        </div>
      )}
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
              <h5 className="text-xl font-semibold mb-1">{currentUserprof.name}</h5>
              <p className="text-gray-600 mb-2">+91 {currentUserprof.phoneNo}</p>
              <p className="text-gray-600 mb-4">{currentUserprof.email}</p>
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
                  <span className="text-gray-600">{currentUserprof.role}</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-blue-800 flex items-center">
                    <FaLocationArrow className="mr-2" />
                    Last Location
                  </span>
                  <span className="text-gray-600">Lat: {currentUserprof.latitude}, Long: {currentUserprof.longitude}</span>
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
            <div className="bg-white rounded shadow-custom-light p-4 mb-4 h-96 flex items-center justify-center">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <div style={{ height: "100%", width: "100%" }}>
                  <Map
                    defaultZoom={12}
                    defaultCenter={position}
                    mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
                  >
                    <Markers points={locations} />
                    {open && (
                      <InfoWindow
                        position={position}
                        onCloseClick={() => setOpen(false)}
                      >
                        <p>Im in hamburg</p>
                      </InfoWindow>
                    )}
                  </Map>
                </div>
              </APIProvider>
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
                        taskStatus === "To complete"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-4 py-2 rounded-full`}
                      onClick={() => setTaskStatus("To complete")}
                    >
                      To complete
                    </button>
                    <button
                      className={`${
                        taskStatus === "In Progress"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-4 py-2 rounded-full`}
                      onClick={() => setTaskStatus("In Progress")}
                    >
                      In Progress
                    </button>
                    <button
                      className={`${
                        taskStatus === "Completed"
                          ? "bg-red-500 text-white "
                          : "text-gray-800"
                      } px-4 py-2 rounded-full`}
                      onClick={() => setTaskStatus("Completed")}
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
                  <div>Loading...</div>
                )}
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

export default EmployeeProfile;
