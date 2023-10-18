import React from "react";

import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
const Main = () => {
  return (
    <>
      <SideBar />
      <div className=" p-2 sm:ml-64   ">
        <div className=" p-2    ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
