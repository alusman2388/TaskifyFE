import axios from "axios";
import React, { ChangeEvent, EventHandler } from "react";
import { useNavigate } from "react-router-dom";

const AddTaskCard = () => {
  const token = sessionStorage.getItem("token");
  const naviagte = useNavigate();
  const [task, setTask] = React.useState({
    title: "",
    description: "",
    priority: "",
  });
  const handleTaskData = (e: ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => ({ ...prevTask, [e.target.name]: e.target.value }));
  };
  const handleCancle = () => {
    naviagte("/");
    setTask({ title: "", description: "", priority: "" });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/add-task",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        alert("Task added successfully");
        naviagte("/");
        setTask({ title: "", description: "", priority: "" });
      }
    } catch (error: any) {
      // Handle Axios error properly
      if (axios.isAxiosError(error)) {
        alert(
          "SignUp Failed: " + (error.response?.data?.message || error.message)
        );
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="card shadow bg-body-tertiary add-card rounded">
        <div className="card-body">
          <h5 className="card-title text-center">Add New Task</h5>
          <form>
            {/* 2 column grid layout with text inputs for the first and last names */}
            <div className="row">
              <div data-mdb-input-init className="form-outline mb-4 ">
                <input
                  type="text"
                  id="form3Example1"
                  className="form-control"
                  name="title"
                  value={task.title}
                  onChange={(e) => handleTaskData(e)}
                  required
                />
                <label className="form-label" htmlFor="form3Example1">
                  Title
                </label>
              </div>
            </div>
            {/* Email input */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form3Example3"
                className="form-control"
                name="description"
                value={task.description}
                onChange={(e) => handleTaskData(e)}
                required
              />
              <label className="form-label" htmlFor="form3Example3">
                Description
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <select
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                name="priority"
                value={task.priority}
                onChange={(e: any) => handleTaskData(e)}
                required
              >
                <option value="" selected>
                  Select Priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <label className="form-label" htmlFor="form3Example4">
                Task Priority
              </label>
            </div>
          </form>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCancle}
            >
              Cancle
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn text-white"
              style={{ backgroundColor: "#AA60C8" }}
            >
              Add task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskCard;
