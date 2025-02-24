import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import UpdateTask from "./UpdateTask";
import { useNavigate } from "react-router-dom";
import DataTable, { Alignment } from "react-data-table-component";

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
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const handleSearch = (event: any) => {
    const searchValue = tasks.filter((item: any) => {
      return item.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredTasks(searchValue);
  };
  const formatTimeAgo = (timestamp: string | number | Date) => {
    const date: any = new Date(timestamp);
    const now: any = new Date();

    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true }); // e.g., "10 minutes ago"
    } else if (diffInHours < 48 && now.getDate() - date.getDate() === 1) {
      return "Yesterday";
    } else {
      return format(date, "dd MMM yyyy"); // e.g., "12 Feb 2025"
    }
  };
  const handleUpdate = (id: number) => {
    navigate("/update-task", { state: { id: id } });
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
      if (response.status == 200) {
        fetchTasks();
        alert("deleted successfully");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTasks = async () => {
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
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const columns: any = [
    {
      name: "Sl.No",
      selector: (row: any, index: number) => index + 1,
      width: "80px",
    },

    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
      width: "150px",
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
    },
    {
      name: "Priority",
      selector: (row: any) => row.priority,
      sortable: true,
      cell: (row: any) =>
        row.priority == "High" ? (
          <span className=" bg-danger text-white rounded-pill px-3">High</span>
        ) : row.priority == "Medium" ? (
          <span className="bg-warning text-white rounded-pill px-3">
            Meduim
          </span>
        ) : (
          <span className="bg-info text-white rounded-pill px-3">Low</span>
        ),
      width: "120px",
    },

    {
      name: "Last Updated",
      selector: (row: any) => formatTimeAgo(row.updatedAt),
      cell: (row: any) =>
        row.updatedAt != null ? (
          <span>
            <span>{formatTimeAgo(row.updatedAt)}</span>
          </span>
        ) : (
          <span>No Updates</span>
        ),
    },
    {
      name: "Completed",
      selector: (row: any) => formatTimeAgo(row.completedAt),
      cell: (row: any) =>
        row.completedAt != null ? (
          <span>{formatTimeAgo(row.completedAt)}</span>
        ) : (
          <span>In Progress</span>
        ),
    },
    {
      name: "Action",
      selector: (row: any) => row.action,
      cell: (row: any) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-warning rounded-pill"
            onClick={() => handleUpdate(row.id)}
          >
            Update
          </button>
          <button
            className="btn btn-danger rounded-pill"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <input
          type="text"
          className=" border col-5 col-lg-auto mb-3 mb-lg-0 me-lg-3"
          onChange={handleSearch}
          placeholder="Search tasks"
        />
      </div>
      <div className="card border-0 shadow rounded-4 mb-5 bg-body-tertiary tab-res rounded">
        <DataTable
          columns={columns}
          data={filteredTasks}
          fixedHeader
          pagination
        />
      </div>
    </>
  );
};

export default Table;
