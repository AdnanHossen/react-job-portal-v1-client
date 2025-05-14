import React from "react";
import { Outlet } from "react-router";
import NavBar from "../SharedComponents/NavBar/NavBar";

const Layouts = () => {
  return (
    <div className="w-11/12 mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layouts;
