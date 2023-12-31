import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCopy, FaPlus } from "react-icons/fa";

import { TbReplace } from "react-icons/tb";

const SideBar = () => {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only text-slate-600">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
        <span className=" px-4 text-slate-700 font-semibold text-2xl">
          Exproseso
        </span>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <span className=" px-2 text-slate-700 font-semibold text-2xl">
            Exproseso
          </span>
          <ul className="  font-medium">
            <li>
              <Link
                to={"/"}
                className="flex items-center px-2 text-gray-900 rounded dark:text-white hover:bg-slate-700 hover:text-slate-100 py-1 dark:hover:bg-gray-700 group"
              >
                <FaHome /> <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/replace-text"}
                className="flex items-center px-2 text-gray-900 rounded dark:text-white hover:bg-slate-700 hover:text-slate-100 py-1 dark:hover:bg-gray-700 group"
              >
                <TbReplace />{" "}
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Replace Text
                </span>
                <FaPlus className="text-slate-400" />
              </Link>
            </li>
            <li>
              <Link
                to={"/auto-copy-text"}
                className="flex items-center px-2 text-gray-900 rounded dark:text-white hover:bg-slate-700 hover:text-slate-100 py-1 dark:hover:bg-gray-700 group"
              >
                <FaCopy />
                <span className="flex-1 ml-3 whitespace-nowrap">Auto Copy</span>
                <FaPlus className="text-slate-400" />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
