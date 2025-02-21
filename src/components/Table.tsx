import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";

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
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  });
  return (
    <>
      <div className="">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">SL.No</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Completed At</th>
              <th scope="col">Action</th>
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

                <td>{formatDate(item.createdAt)}</td>
                {item.updatedAt != null ? (
                  <td>
                    <td>{formatDate(item.updatedAt)}</td>
                  </td>
                ) : (
                  <td>Not Updated</td>
                )}

                {item.completedAt != null ? (
                  <td>{formatDate(item.completedAt)}</td>
                ) : (
                  <td>Not completed</td>
                )}
                <td>
                  <div className="d-flex gap-2">
                    <GrDocumentUpdate size={30} color="#EB5B00" />
                    <MdDeleteOutline size={30} color="Red" />
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
