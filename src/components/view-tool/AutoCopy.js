import React from "react";
import { FaTrash } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";

const AutoCopy = ({ tool, onDelete, processText, onEdit, truncateText }) => {
  return (
    <div className="bg-slate-700 rounded">
      <div className=" flex justify-end items-center w-full p-1  ">
        <small
          onClick={() => onDelete(tool._id)}
          className="cursor-pointer  hover:bg-slate-600 py-1 px-1 text-slate-100 font-semibold  "
        >
          <FaTrash size={"1.1rem"} />
        </small>
        <small
          onClick={() => onEdit(tool)}
          className="cursor-pointer hover:bg-slate-600  py-1 px-1 text-slate-100 font-semibold "
        >
          <FaEdit size={"1.2rem"} />
        </small>
      </div>

      <div
        onClick={() => processText(tool)}
        className=" bg-slate-200  flex flex-col justify-between h-[210px]  p-2  cursor-pointer hover:shadow-lg  "
      >
        <div className="flex-col flex">
          <small>
            <strong>Text to copy:</strong>{" "}
            <span className="block text-[#666666]">
              {" "}
              {truncateText(tool.textToCopy, 20)}{" "}
            </span>
          </small>
        </div>

        <div className=" flex justify-center items-center  h-[110px] rounded mt-2 bg-orange-400 ">
          <span className="text-slate-100 font-semibold text-2xl text-center p-1">
            {tool.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AutoCopy;
