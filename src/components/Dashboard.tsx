import TaskCountCards from "./TaskCountCards";
import DIsplayTaskCards from "./DIsplayTaskCards";
import Table from "./Table";
import { Link } from "react-router-dom";
import AddTaskCard from "./AddTaskCard";

const Dashboard = () => {
  return (
    <>
      <div className=" container">
        <div className=" d-flex justify-content-md-center  flex-wrap  gap-5 mt-5">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add New Task +
          </button>
          <AddTaskCard />
          <TaskCountCards />
        </div>

        <Table />
        {/* <DIsplayTaskCards /> */}
      </div>
    </>
  );
};

export default Dashboard;
