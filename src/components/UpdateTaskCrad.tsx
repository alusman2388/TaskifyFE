import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface Task {
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
}

const UpdateTaskCrad = () => {
  const location = useLocation();
  const id = location.state.id;
  const token = sessionStorage.getItem("token");
  const naviagte = useNavigate();
  const [updateTask, setUpdateTask] = useState<Task>({
    title: "",
    description: "",
    priority: "",
    completed: false,
  });
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateTask((prevTask) => ({
      ...prevTask,
      completed: event.target.checked, // Update completed directly
    }));
  };
  const handleTaskData = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCancle = () => {
    naviagte("/");
    setUpdateTask({
      title: "",
      description: "",
      priority: "",
      completed: false,
    });
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-task/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUpdateTask(response.data);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/update-task/${id}`,
        updateTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hihihih", response.data);
      if (response.status == 200) {
        alert("Task updated successfully");
        naviagte("/");
        setUpdateTask({ title: "", description: "", priority: "" });
      }
    } catch (error: any) {
      // Handle Axios error properly
      if (axios.isAxiosError(error)) {
        alert(
          "update Failed: " + (error.response?.data?.message || error.message)
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
          <h5 className="card-title text-center">Update Task</h5>
          <form>
            <div className="row">
              <div data-mdb-input-init className="form-outline mb-4 ">
                <input
                  type="text"
                  id="form3Example1"
                  className="form-control"
                  name="title"
                  value={updateTask.title}
                  onChange={(e) => handleTaskData(e)}
                  required
                />
                <label className="form-label" htmlFor="form3Example1">
                  Title
                </label>
              </div>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form3Example3"
                className="form-control"
                name="description"
                value={updateTask.description}
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
                value={updateTask.priority}
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
            <div data-mdb-input-init className="form-outline mb-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  name="completed"
                  checked={updateTask.completed}
                  onChange={(e) => handleSwitchChange(e)}
                />
              </div>

              <label className="form-label" htmlFor="form3Example3">
                Mark task as completed
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
              Update Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskCrad;
