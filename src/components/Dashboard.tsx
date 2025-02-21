import React, { useEffect } from "react";
import axios from "axios";
import TaskCountCards from "./TaskCountCards";
import DIsplayTaskCards from "./DIsplayTaskCards";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const [totalTasks, setTotalTasks] = React.useState(0);
  const [CompletedTasks, setCompletedTasks] = React.useState(0);
  const [pendingTasks, setPendingTasks] = React.useState(0);

  useEffect(() => {
    (async () => {
      try {
        const count = await axios.get("http://localhost:8080/api/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalTasks(count.data);
        const completed = await axios.get(
          "http://localhost:8080/api/completed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompletedTasks(completed.data);

        const pending = await axios.get("http://localhost:8080/api/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingTasks(pending.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [token]);

  return (
    <>
      <div className=" container">
        <div className=" d-flex justify-content-md-start justify-content-center row md-column gap-5 mt-5">
          <TaskCountCards name={"Pending Tasks"} value={pendingTasks} />
          <TaskCountCards name={"Completed Tasks"} value={CompletedTasks} />
          <TaskCountCards name={"Total Tasks"} value={totalTasks} />
        </div>

        <DIsplayTaskCards />
      </div>
    </>
  );
};

export default Dashboard;
