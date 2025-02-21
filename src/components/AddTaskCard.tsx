import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const AddTaskCard = () => {
  const token = sessionStorage.getItem("token");

  const [addNewTask, setAddNewTask] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const handleTaskData = (e: ChangeEvent<HTMLInputElement>) => {
    setAddNewTask({ ...addNewTask, [e.target.name]: e.target.value });
    console.log(addNewTask);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevents page reloa

    try {
      const response = await axios.post(
        "http://localhost:8080/api/add-task",
        addNewTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("New Task Added Successfully");
        setAddNewTask({ title: "", description: "", priority: "" });
        //navigate("/login");
      }
    } catch (error: any) {
      alert(
        "Adding new task Failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
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
                Add New Task
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
                      value={addNewTask.title}
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
                    value={addNewTask.description}
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
                    value={addNewTask.priority}
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
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskCard;
