import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskCrads from "./TaskCrads";

const DIsplayTaskCards = () => {
  const [compltedTasks, setCompltedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    (async () => {
      // IIFE: Immediately Invoked Function Expression
      try {
        const completed = true;
        const response = await axios.get(
          `http://localhost:8080/api/completed-tasks/${completed}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompltedTasks(response.data);
        console.log("complted Data:", compltedTasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [token]);
  useEffect(() => {
    (async () => {
      // IIFE: Immediately Invoked Function Expression
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pending-tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingTasks(response.data);
        console.log("pending Data:", pendingTasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [token]);
  return (
    <div>
      <div className=" d-flex justify-content-center row md-column gap-5 mt-4">
        <div
          className="card  d-flex justify-content-start align-items-center row gap-2 pb-3 pt-1"
          style={{ width: "20rem", background: "#aee1fc" }}
        >
          <p
            className=" text-white  text-center rounded-1  mt-2 py-1"
            style={{ background: "#60abfb" }}
          >
            Pending Tasks
          </p>
          <TaskCrads Tasks={pendingTasks} />
        </div>
        <div
          className="card  d-flex justify-content-start align-items-center row gap-2 pb-3 pt-1"
          style={{ width: "20rem", background: "#FFC785" }}
        >
          <p
            className=" text-white  text-center rounded-1 mt-2 py-1"
            style={{ background: "#F26B0F" }}
          >
            Working Tasks
          </p>
          <TaskCrads Tasks={pendingTasks} />
        </div>
        <div
          className="card d-flex justify-content-start align-items-center row gap-2 pb-3 pt-1"
          style={{ width: "20rem", background: "#bee4d2" }}
        >
          <p
            className=" text-white  text-center rounded-1 mt-2 py-1"
            style={{ background: "#1a936f" }}
          >
            Completed Tasks
          </p>
          <TaskCrads Tasks={compltedTasks} />
        </div>
      </div>
    </div>
  );
};

export default DIsplayTaskCards;
