import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const UpdateTask = ({ id }) => {
  const token = sessionStorage.getItem("token");

  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
    priority: "",
    completed: false,
  });
  const handleTaskData = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTask({ ...updateTask, [e.target.name]: e.target.value });
    console.log(updateTask);
  };
  useEffect(() => {
    const response = axios
      .get(`http://localhost:8080/api/get-task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // setUpdateTask();
      .then((response) => setUpdateTask(response.data))
      .catch((error) => console.log(error));
    console.log(updateTask);
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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

      if (response.status === 200) {
        alert("Updated Successfully");
        setUpdateTask({
          title: "",
          description: "",
          priority: "",
          completed: false,
        });
        //navigate("/login");
      }
    } catch (error: any) {
      alert(
        "updating task Failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div
      className="modal fade"
      id="updatetask"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Modal title{id}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
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
              {/* Email input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
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
                    Open this select menu
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <label className="form-label" htmlFor="form3Example4">
                  Priority
                </label>
                <div data-mdb-input-init className="form-outline ">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      name="completed"
                    />
                  </div>
                  <label className="form-label" htmlFor="form3Example3">
                    Completed
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
