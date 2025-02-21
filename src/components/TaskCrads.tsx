import React from "react";
import { IoIosTimer } from "react-icons/io";

interface Tasks {
  title: String;
  description: String;
  priority: String;
  createdAt: any;
  updatedAt: any;
  completedAt: any;
  completed: boolean;
}
interface Props {
  Tasks: Tasks[];
}
const TaskCrads: React.FC<Props> = ({ Tasks }) => {
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      {Tasks.map((item: any) => (
        <div className="card border-0" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            {item.priority === "High" ? (
              <span className="translate-middle badge badge-posi rounded-pill bg-light text-info">
                High
              </span>
            ) : item.priority === "Medium" ? (
              <span className="translate-middle badge badge-posi rounded-pill bg-light text-warning">
                Medium
              </span>
            ) : (
              <span className="translate-middle badge badge-posi rounded-pill bg-light text-danger">
                Low
              </span>
            )}

            <h6 className="card-subtitle mb-2 text-body-secondary">
              {item.description}{" "}
            </h6>
            <p className="card-text">
              Created at <IoIosTimer /> {formatDate(item.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskCrads;
