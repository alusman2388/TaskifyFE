import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });
  const handleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevents page reload

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/addNewUser",
        userData
      );

      if (response.status === 200) {
        alert("SignUp Successful");
        setUserData({ name: "", email: "", password: "", roles: "" });
        navigate("/login");
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
    <>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 px-md-5 vh-100 pt-5 fixed  text-center text-lg-start">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                The best offer <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for your business
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              />
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              />
              <div className="card bg-glass w-md-75">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row">
                      <div data-mdb-input-init className="form-outline mb-4 ">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          name="name"
                          value={userData.name}
                          onChange={(e) => handleUserData(e)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example1">
                          Name
                        </label>
                      </div>
                    </div>
                    {/* Email input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        name="email"
                        value={userData.email}
                        onChange={(e) => handleUserData(e)}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>
                    {/* Password input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        name="password"
                        value={userData.password}
                        required
                        onChange={(e) => handleUserData(e)}
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        name="roles"
                        value={userData.roles}
                        onChange={(e: any) => handleUserData(e)}
                        required
                      >
                        <option value="" selected>
                          Open this select menu
                        </option>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_USER">User</option>
                      </select>

                      <label className="form-label" htmlFor="form3Example4">
                        User Role
                      </label>
                    </div>
                    {/* Checkbox */}
                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="form2Example33"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example33"
                      >
                        Subscribe to our newsletter
                      </label>
                    </div>
                    <div className="row gx-5">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-secon btn-block mb-4 text-white"
                        style={{ background: "#934662" }}
                        onClick={() => navigate("/login")}
                      >
                        Back to Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
