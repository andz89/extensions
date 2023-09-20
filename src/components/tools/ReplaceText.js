import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ReplaceText = () => {
  const [textToReplace, setTextToReplace] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [newSet, setNewSet] = useState(false);
  const handleOnClick = async () => {
    const text_result = text.replaceAll(textToReplace.trim(), " ");
    setResult(text_result);
    try {
      await navigator.clipboard.writeText(text_result);

      toast.success("Text copied to clipboard!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Error copying text to clipboard", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    async function fetchData() {
      if (text && newSet) {
        const text_result = text.replaceAll(textToReplace.trim(), " ");
        setResult(text_result);
        try {
          await navigator.clipboard.writeText(text_result);

          toast.success("Text copied to clipboard!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } catch (error) {
          toast.error("Error copying text to clipboard", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
        setNewSet(false);
      }
    }

    fetchData();
  }, [text, textToReplace, newSet]);

  const handlePaste = async (event) => {
    // Access the pasted content from the event object
    const pastedText = event.clipboardData.getData("text");
    // You can do something with the pasted text here
    // For example, set it to the text state
    setText(pastedText);
    setNewSet(true);
  };
  return (
    <div>
      <div className="flex gap-10  justify-center items-end ">
        <div className="w-full">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Text to replace
          </label>
          <input
            onChange={(e) => setTextToReplace(e.target.value)}
            type="text"
            id="default-input"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  focus:ring-blue-500  focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Paste text here
          </label>
          <input
            onPaste={handlePaste} // Add the onPaste event handler
            onChange={(e) => setText(e.target.value)}
            type="text"
            id="default-input"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  focus:ring-blue-500  focus:border-blue-500"
          />
        </div>
        <div className=" ">
          <div
            className="cursor-pointer bg-slate-800 text-white p-2 rounded "
            onClick={handleOnClick}
          >
            Submit
          </div>
        </div>
      </div>

      {/* result */}
      <div className="mt-5">
        <div className="w-full mb-2">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pasted Text
          </label>
          <span className="p-1 font-semiBold text-blue-700">{text}</span>
        </div>
        <div className="w-full">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Result
          </label>
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            type="text"
            id="default-input"
            className=" bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  focus:ring-blue-500  focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ReplaceText;
