import { useDispatch } from "react-redux";
import { logout } from "./Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import ProfileModal from "./ProfileModal";

const Hearder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const [userData, setUserData] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      // IIFE: Immediately Invoked Function Expression
      try {
        const response = await axios.get("http://localhost:8080/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        //console.log("Fetched Data:", userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <>
      <header className="px-3" style={{ background: "#AA60C8" }}>
        <div className="">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-start mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <h1>TASKIFY</h1>
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 text-white">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/table" className="nav-link px-2 text-white">
                  Table
                </Link>
              </li>
              <li>
                <Link to="/table" className="nav-link px-2 text-white">
                  Pending Tasks
                </Link>
              </li>
              <li>
                <Link to="/table" className="nav-link px-2 text-white">
                  Completed Tasks
                </Link>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  About
                </a>
              </li>
            </ul>
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control border rounded-pill"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <div className="fw-bolder me-2">
              <span>Hello,</span>
              <span> {userData.name}</span>
            </div>
            <div className="text-end me-2">
              <CgProfile
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                size={35}
              />
            </div>
          </div>
        </div>

        <ProfileModal UserData={userData} logout={handleLogout} />
      </header>
    </>
  );
};

export default Hearder;
