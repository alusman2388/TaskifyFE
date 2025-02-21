import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import UpdateTask from "./UpdateTask";

interface Tasks {
  id: number;
  title: String;
  description: String;
  priority: String;
  createdAt: any;
  updatedAt: any;
  completedAt: any;
  completed: boolean;
}

const Table = () => {
  const token = sessionStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const formatTimeAgo = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const now = new Date();

    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true }); // e.g., "10 minutes ago"
    } else if (diffInHours < 48 && now.getDate() - date.getDate() === 1) {
      return "Yesterday";
    } else {
      return format(date, "dd MMM yyyy"); // e.g., "12 Feb 2025"
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/del-task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/get-all-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  return (
    <>
      <div className="card border-0 shadow rounded-4 mb-5 bg-body-tertiary rounded">
        <table className="table table-hover table-borderless">
          <thead>
            <tr>
              <th className="text-body-tertiary" scope="col">
                SL.No
              </th>
              <th className="text-body-tertiary fw-medium" scope="col">
                Title
              </th>
              <th className="text-body-tertiary fw-medium" scope="col">
                Description
              </th>
              <th className="text-body-tertiary fw-medium" scope="col">
                Priority
              </th>
              <th className="text-body-tertiary fw-medium" scope="col">
                Last Updated
              </th>
              <th className="text-body-tertiary fw-medium" scope="col">
                Completed
              </th>
              <th className="text-body-tertiary fw-medium" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item: Tasks, index: number) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.description}</td>
                {item.priority == "High" ? (
                  <td className="text-danger">High</td>
                ) : item.priority == "Medium" ? (
                  <td className="text-warning">Meduim</td>
                ) : (
                  <td className="text-info">Low</td>
                )}

                {item.updatedAt != null ? (
                  <td>
                    <td>{formatTimeAgo(item.updatedAt)}</td>
                  </td>
                ) : (
                  <td>No Updates</td>
                )}

                {item.completedAt != null ? (
                  <td>{formatTimeAgo(item.completedAt)}</td>
                ) : (
                  <td>In Progress</td>
                )}
                <td>
                  <div className="d-flex gap-2">
                    <GrDocumentUpdate
                      data-bs-toggle="modal"
                      data-bs-target="#updatetask"
                      size={30}
                      color="#EB5B00"
                    />
                    <UpdateTask />
                    <MdDeleteOutline
                      onClick={() => handleDelete(item.id)}
                      size={30}
                      color="Red"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
