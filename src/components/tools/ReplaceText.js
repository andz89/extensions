import { useState } from "react";
import { toast } from "react-toastify";
import CreateTool from "./CreateTool";
import { useSelector, useDispatch } from "react-redux";
import { toolAdded } from "../../features/tools/toolsSlice";
import { v4 as uuidv4 } from "uuid";

const ReplaceText = () => {
  const tool_name = "replaceText";
  const dispatch = useDispatch();
  const [textToRemove, setTextToRemove] = useState("");
  const [textToInsert, setTextToInsert] = useState("");
  const [setshowSaveToolForm, setShowSaveToolForm] = useState(false);
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
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
    if (!text) {
      return EmptyInputsWarning("text to filter");
    }
    if (!textToRemove) {
      return EmptyInputsWarning("text to remove");
    }

    const text_result = text.replaceAll(textToRemove.trim(), textToInsert);
    setResult(text_result);

    await navigator.clipboard.writeText(text_result);

    const regex = new RegExp(textToRemove.trim(), "g");
    const matches = text.match(regex); // Get an array of all matches
    const numberOfMatches = matches ? matches.length : 0;
    setCount(numberOfMatches);
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
    setText("");
    setResult("");

    setCount(0);
    toast.dismiss();
  });
  const onSaveTool = () => {
    const _id = uuidv4();
    setShowSaveToolForm(false);
    dispatch(toolAdded({ tool_name, label, textToRemove, textToInsert, _id }));
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
        <div className="w-full flex gap-2">
          <div className="w-full">
            <label className="block   text-sm font-medium text-gray-900 dark:text-white">
              Text to remove
            </label>
            <textarea
              onChange={(e) => setTextToRemove(e.target.value)}
              rows="3"
              className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="text here..."
            ></textarea>
          </div>
          <div className="w-full">
            <label className="block   text-sm font-medium text-gray-900 dark:text-white">
              Text to insert
            </label>
            <textarea
              onChange={(e) => setTextToInsert(e.target.value)}
              rows="3"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="text here..."
            ></textarea>
          </div>
        </div>
        <div className="w-full">
          <label className="block  text-sm font-medium text-gray-900 dark:text-white">
            Text to filter
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
            className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="text here..."
          ></textarea>
        </div>
        <div
          onClick={handleOnClick}
          className="w-full cursor-pointer h-[120px] bg-slate-200 flex justify-center items-center"
        >
          <div className="  text-slate-600  text-3xl font-semibold">
            Click here to process
          </div>
        </div>
      </div>

      {/* result */}

      <div className="mt-5">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Matches: {count ? count : "No result found"}
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Result
          </label>

          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows="6"
            className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="text here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ReplaceText;
