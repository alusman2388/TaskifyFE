import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AddTaskButton = () => {
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate("/add-new-task");
  };
  return (
    <div>
      <button
        className="btn add-task position-relative "
        style={{ backgroundColor: "#D69ADE" }}
        onClick={handelNavigate}
      >
        <span className="fs-5">
          Add Task
          <IoIosAddCircleOutline color="white" size={30} />
        </span>
      </button>
    </div>
  );
};

export default AddTaskButton;
