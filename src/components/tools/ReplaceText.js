import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ReplaceText = () => {
  const [textToReplace, setTextToReplace] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const handleOnClick = async () => {
    const text_result = text.replaceAll(textToReplace.trim(), "");
    setResult(text_result);
    try {
      await navigator.clipboard.writeText(text_result);

      toast.success("Text copied to clipboard!", {
        position: "top-right",
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
    document.title = "Replace Text"; // Set the title you want
    const handleFocus = (event) => {
      if (navigator.clipboard && textToReplace) {
        // Attempt to read data from the clipboard
        navigator.clipboard
          .readText()
          .then((text) => {
            // 'text' variable contains the text from the clipboard
            const plainText = text;

            // You can now use 'plainText' as plain text data
            setText(plainText);
            const text_result = text.replaceAll(textToReplace.trim(), "");
            setResult(text_result);
            navigator.clipboard.writeText(text_result);
            const regex = new RegExp(textToReplace.trim(), "g");
            const matches = text.match(regex); // Get an array of all matches
            const numberOfMatches = matches ? matches.length : 0;
            setCount(numberOfMatches);
            setSuccess(true);
          })
          .catch((error) => {
            console.error("Failed to read clipboard: ", error);
          });
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [textToReplace]);

  useEffect(() => {
    if (success) {
      try {
        const toastId = toast.success("Text copied to clipboard!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return () => {
          toast.dismiss(toastId);
        };
      } catch (error) {
        const toastId = toast.error("Error copying text to clipboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        return () => {
          toast.dismiss(toastId);
        };
      }
    }
  }, [success, setSuccess]);
  window.addEventListener("blur", function (event) {
    setText("");
    setResult("");
    setSuccess(false);
    setCount(0);
    toast.dismiss();
  });
  function stripFormatting(input) {
    // Use a regular expression to remove HTML tags and formatting
    return input.replace(/<[^>]*>/g, "");
  }
  // Check if the Clipboard API is available in the browser

  return (
    <div>
      <div className="flex  gap-2 flex-col  justify-center items-end ">
        <div className="w-full">
          <label className="block   text-sm font-medium text-gray-900 dark:text-white">
            Text to remove
          </label>
          <textarea
            onChange={(e) => setTextToReplace(e.target.value)}
            rows="3"
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div className="w-full">
          <label className="block  text-sm font-medium text-gray-900 dark:text-white">
            Text to filter
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
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
            Matches: {count ? count : "No result found"}
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Result
          </label>

          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows="6"
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ReplaceText;
