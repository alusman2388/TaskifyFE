import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineBatchPrediction } from "react-icons/md";

const TaskCountCards: React.FC = () => {
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
      <div className="card w-50">
        <div className="card-body">
          <div className="d-flex justify-content-md-between flex-wrap flex-md-nowrap gap-5 ms-md-5">
            <div className="row gap-2">
              <div>
                <MdOutlineBatchPrediction
                  size={40}
                  className=" rounded-circle bg-opacity-50  p-2 "
                  style={{ backgroundColor: "#98E4FF" }}
                  color="#009EFF"
                />
              </div>
              <div>
                <span className="text-secondary  fs-5">Total Tasks</span>
              </div>
              <div>
                <span className="fw-medium fs-2">{totalTasks}</span>
              </div>
            </div>
            <div className="row gap-2">
              <div>
                <MdOutlineDone
                  size={40}
                  className=" rounded-circle bg-opacity-50 bg-success text-success p-2"
                />
              </div>
              <div>
                <span className="text-secondary fs-5">Completed Tasks</span>
              </div>
              <div>
                <span className="fw-medium fs-2">{CompletedTasks}</span>
              </div>
            </div>

            <div className=" row gap-2">
              <div>
                <AiOutlineFieldTime
                  size={40}
                  className=" rounded-circle bg-opacity-50  p-2 "
                  style={{ backgroundColor: "#FEFFA7" }}
                  color="#FF9D23"
                />
              </div>
              <div>
                <span className="text-secondary fs-5">In progress</span>
              </div>
              <div>
                <span className="fw-medium fs-2">{pendingTasks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCountCards;
