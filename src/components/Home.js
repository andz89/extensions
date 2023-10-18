import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeTool } from "../features/tools/toolsSlice";
import ReplaceText from "./view-tool/ReplaceText";
import AutoCopy from "./view-tool/AutoCopy";
import EditTool from "./create-tool/EditTool";
function Home() {
  const [showEditToolForm, setShowEditToolForm] = useState(false);
  const [tool_data, setTool_data] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Extensions: Home"; // Set the title you want
  });
  const { tools } = useSelector((state) => state.tools);
  const processText = (tool) => {
    if (navigator.clipboard) {
      // Attempt to read data from the clipboard
      navigator.clipboard
        .readText()
        .then((text) => {
          if (tool.tool_name === "replaceText") {
            const text_result = text.replaceAll(
              tool.textToRemove.trim(),
              tool.textToInsert
            );

            navigator.clipboard.writeText(text_result);

            // const regex = new RegExp(textToRemove.trim(), "g");
            // const matches = text.match(regex); // Get an array of all matches
            // const numberOfMatches = matches ? matches.length : 0;
            // setCount(numberOfMatches);
          }
          if (tool.tool_name === "autoCopy") {
            navigator.clipboard.writeText(tool.textToCopy);
          }
        })
        .catch((error) => {
          console.error("Failed to read clipboard: ", error);
        });
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
    } else {
      toast.error("clipboard is empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const onDelete = (toolId) => {
    const _id = toolId;
    dispatch(removeTool({ _id }));
  };
  const onEdit = (tool_data) => {
    setTool_data(tool_data);
    setShowEditToolForm(true);
  };

  // Set your desired maximum character length

  // Call the truncateText function to limit the text to the specified number of characters
  const truncateText = (text, maxLength) => {
    // If the text length is greater than the maxLength, truncate it
    if (text.length > maxLength) {
      const truncatedText = text.slice(0, maxLength);
      return `${truncatedText}...`;
    }

    // If the text length is less than or equal to the maxLength, return the original text
    return text;
  };
  const extensions_tools = tools.map((tool) => (
    <div key={tool._id} className="w-[150px] sm:w-[200px] ">
      {tool.tool_name === "replaceText" && (
        <ReplaceText
          onDelete={onDelete}
          processText={processText}
          truncateText={truncateText}
          onEdit={onEdit}
          tool={tool}
        />
      )}
      {tool.tool_name === "autoCopy" && (
        <AutoCopy
          onDelete={onDelete}
          processText={processText}
          truncateText={truncateText}
          onEdit={onEdit}
          tool={tool}
        />
      )}
    </div>
  ));
  return (
    <>
      {showEditToolForm && (
        <EditTool
          tool_data={tool_data}
          setShowEditToolForm={setShowEditToolForm}
        />
      )}
      <div className="flex gap-3 flex-wrap bg-yellow-100 p-3    w-full    justify-center sm:justify-start">
        {extensions_tools}
      </div>
    </>
  );
}

export default Home;
