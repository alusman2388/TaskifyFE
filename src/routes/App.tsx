import React from "react";
import Footer from "../components/Footer";
import Hearder from "../components/Hearder";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const App: React.FC = () => {
  return (
    <>
      <Hearder />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
