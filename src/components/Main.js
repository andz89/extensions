import React from "react";

import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
const Main = () => {
  return (
    <>
      <SideBar />
      <div className=" p-4 sm:ml-64 ">
        <div className=" p-4 border-2 border-gray-200 border-dashed rounded-lg   dark:border-gray-700 h-[90vh]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
