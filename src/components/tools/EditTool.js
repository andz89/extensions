import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toolEditted } from "../../features/tools/toolsSlice";
const EditTool = ({ setShowEditToolForm, tool_data }) => {
  console.log(tool_data.tool_name);
  const dispatch = useDispatch();
  const [textToRemove, setTextToRemove] = useState("");
  const [textToInsert, setTextToInsert] = useState("");
  const [textToCopy, setTextToCopy] = useState("");

  const [label, setLabel] = useState("");

  const _id = tool_data._id;
  useEffect(() => {
    setTextToInsert(tool_data.textToInsert);
    setTextToRemove(tool_data.textToRemove);
    setTextToCopy(tool_data.textToCopy);

    setLabel(tool_data.label);
  }, []);
  const onSaveTool = () => {
    setShowEditToolForm((prev) => !prev);
    dispatch(toolEditted({ textToRemove, textToInsert, _id, label }));
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden bg-slate-900 bg-opacity-40 overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  h-screen  flex items-center justify-center ">
      <div
        role="status"
        className="flex items-center justify-center bg-white w-[500px]  p-5 rounded flex flex-col gap-2"
      >
        <div className="w-full">
          <div className="flex  gap-2   justify-end items-center">
            <div
              onClick={onSaveTool}
              className="bg-slate-700 py-1 px-2 cursor-pointer font-semibold text-white rounded"
            >
              Save
            </div>
            <div
              onClick={() => setShowEditToolForm((prev) => !prev)}
              className="bg-red-500 py-1 px-2 cursor-pointer font-semibold text-white rounded"
            >
              Cancel
            </div>
          </div>
          <label className="block   text-sm font-medium text-gray-900 dark:text-white">
            Label
          </label>
          <textarea
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            rows="3"
            className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tool name"
          ></textarea>

          {tool_data.tool_name === "autoCopy" && (
            <div>
              <label className="block   text-sm font-medium text-gray-900 dark:text-white">
                Text to copy
              </label>
              <textarea
                value={textToCopy}
                onChange={(e) => setTextToRemove(e.target.value)}
                rows="3"
                className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="text here..."
              ></textarea>
            </div>
          )}
          {tool_data.tool_name === "replaceText" && (
            <div>
              <label className="block   text-sm font-medium text-gray-900 dark:text-white">
                Text to remove
              </label>
              <textarea
                value={textToRemove}
                onChange={(e) => setTextToRemove(e.target.value)}
                rows="3"
                className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="text here..."
              ></textarea>

              <div className="w-full">
                <label className="block   text-sm font-medium text-gray-900 dark:text-white">
                  Text to insert
                </label>
                <textarea
                  value={textToInsert}
                  onChange={(e) => setTextToInsert(e.target.value)}
                  rows="3"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="text here..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTool;
