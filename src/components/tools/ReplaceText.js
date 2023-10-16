import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ReplaceText = () => {
  const [textToReplace, setTextToReplace] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [newSet, setNewSet] = useState(false);
  const [clipboardContent, setClipboardContent] = useState("");
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
  window.addEventListener("focus", function (event) {
    if (navigator.clipboard) {
      // Attempt to read data from the clipboard
      navigator.clipboard
        .readText()
        .then((text) => {
          // 'text' variable contains the text from the clipboard
          const plainText = stripFormatting(text);

          // You can now use 'plainText' as plain text data
          setText(plainText);

          setNewSet(true);
        })
        .catch((error) => {
          console.error("Failed to read clipboard: ", error);
        });
    }
  });
  function stripFormatting(input) {
    // Use a regular expression to remove HTML tags and formatting
    return input.replace(/<[^>]*>/g, "");
  }
  // Check if the Clipboard API is available in the browser

  useEffect(() => {
    async function fetchData() {
      if (text && newSet && textToReplace) {
        const text_result = text.replaceAll(textToReplace.trim(), " ");
        setResult(text_result);
        try {
          await navigator.clipboard.writeText(text_result);

          toast.success("Text copied to clipboard!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } catch (error) {
          toast.error("Error copying text to clipboard", {
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
      <div className="flex  gap-2 flex-col  justify-center items-end ">
        <div className="w-full">
          <label className="block   text-sm font-medium text-gray-900 dark:text-white">
            Text to replace
          </label>
          <input
            onChange={(e) => setTextToReplace(e.target.value)}
            type="text"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  focus:ring-blue-500  focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block  text-sm font-medium text-gray-900 dark:text-white">
            Paste or Type text here
          </label>
          <input
            onPaste={handlePaste} // Add the onPaste event handler
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
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
      <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700" />
      <div className="mt-5">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Result
          </label>
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            type="text"
            className=" bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  focus:ring-blue-500  focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ReplaceText;
