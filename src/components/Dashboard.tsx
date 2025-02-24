import TaskCountCards from "./TaskCountCards";
import Table from "./Table";
import DIsplayTaskCards from "./DIsplayTaskCards";
import AddTaskButton from "./AddTaskButton";

const Dashboard = () => {
  return (
    <>
      <div className=" container">
        <div className=" d-flex justify-content-center gap-5 my-5 ">
          <TaskCountCards />
          <AddTaskButton />
        </div>
        <Table />
      </div>
    </>
  );
};

export default Dashboard;
