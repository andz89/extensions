import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateTool from "./CreateTool";
import { useSelector, useDispatch } from "react-redux";
import { toolAdded } from "../../features/tools/toolsSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const ReplaceText = () => {
  const tool_name = "autoCopy";
  const navigate = useNavigate();
  const [textToCopy, setTextToCopy] = useState("");
  const [setshowSaveToolForm, setShowSaveToolForm] = useState(false);
  const [label, setLabel] = useState("");

  const dispatch = useDispatch();
  const EmptyInputsWarning = (errorText) => {
    toast.error(errorText + " is empty", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  const handleOnClick = async () => {
    if (!textToCopy) {
      return EmptyInputsWarning("text to copy");
    }

    await navigator.clipboard.writeText(textToCopy);

    toast.success("Text copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  window.addEventListener("blur", function (event) {
    toast.dismiss();
  });
  const onSaveTool = () => {
    const _id = uuidv4();
    setShowSaveToolForm(false);
    dispatch(toolAdded({ tool_name, label, _id, textToCopy }));
    navigate("/");
  };
  return (
    <div>
      {setshowSaveToolForm && (
        <CreateTool
          setShowSaveToolForm={setShowSaveToolForm}
          setLabel={setLabel}
          onSaveTool={onSaveTool}
        />
      )}
      <div className="flex  gap-2 flex-col  justify-center items-end ">
        <div
          onClick={() => setShowSaveToolForm((prev) => !prev)}
          className="bg-slate-700 py-1 px-2 cursor-pointer font-semibold text-white rounded"
        >
          Create Tool
        </div>
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Text to copy to clipboard
          </label>
          <textarea
            onChange={(e) => setTextToCopy(e.target.value)}
            rows="10"
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>

      {/* result */}
      <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700" />
      <div
        onClick={handleOnClick}
        className="w-full cursor-pointer h-[120px] bg-slate-200 flex justify-center items-center"
      >
        <div className="  text-slate-600  text-3xl font-semibold">
          Click here to copy
        </div>
      </div>
    </div>
  );
};

export default ReplaceText;
