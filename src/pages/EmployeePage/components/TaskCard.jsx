import React from "react";
import dayjs from "dayjs";
import { Card, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";


function TaskCard({ tasks, taskStatus, datevalue }) {
    
      const filteredTasks = tasks.filter(
        (task) =>
          task.status === taskStatus &&
        dayjs(task.completion_date).format("YYYY-MM-DD") === dayjs(datevalue).format("YYYY-MM-DD")
      );

  return (
    <div id="scrollbar" className="space-y-4 overflow-auto max-h-72 px-1">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => {

        return (

          <div className="mt-1 mb-1 shadow-custom-light rounded-lg">
            <Card className="border-0 rounded-xl">
              <div className="p-3">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="line-clamp-3 px-2 pb-2 text-base sm:text-xl font-medium leading-tight">
                    {task.location_name}
                  </div>
                  <div className="flex pt-0 pr-4">
                    {task.location_map_link && (
                      <a
                        href={task.location_map_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent text-white shadow-custom-light ">
                          <FaMapMarkerAlt className="fas fa-share-alt text-[#E75A5A]" />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
                <Row className="flex items-center font-normal mx-2">
                  <Col xs="auto" className="pr-2">
                    <IoPerson className="text-lg text-[#808080]" />{" "}
                    {/* This is the date icon */}
                  </Col>
                  <Col className="p-0">
                    <a className="text-sm sm:text-sm md:text-sm">
                      {task.location_poc_name}
                    </a>
                    {/* This is the fest.date from Firebase */}
                  </Col>
                </Row>
                <Row className="flex items-center font-normal mt-1 mx-2">
                  <Col xs="auto" className="pr-2">
                    <FaPhoneAlt className="text-lg text-[#808080]" />{" "}
                  </Col>
                  <Col className="p-0">
                    <a
                      href={`tel:${task.location_poc_phoneNo}`}
                      className="text-sm sm:text-sm md:text-sm"
                    >
                      {task.location_poc_phoneNo}
                    </a>
                    {/* This is the fest.date from Firebase */}
                  </Col>
                </Row>
                <Row className="flex items-center font-normal mt-1 mx-2">
                  <Col className="p-0">
                    <a className="text-xs font-light sm:text-sm md:text-sm">
                      Task created at{" "}
                      {dayjs(task.created_at).format(
                        "dddd, MMMM D, YYYY h:mm A"
                      )}
                    </a>
                    {/* This is the fest.date from Firebase */}
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        )})
      ) : (
        <p className="text-gray-600">No tasks found</p>
      )}
    </div>
  );
}

export default TaskCard;
