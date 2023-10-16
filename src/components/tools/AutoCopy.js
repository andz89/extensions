import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ReplaceText = () => {
  const [textToCopy, setTextToCopy] = useState("");

  const [newSet, setNewSet] = useState(false);
  window.addEventListener("focus", async function (event) {
    setNewSet(true);
  });

  useEffect(() => {
    document.title = "Auto Copy"; // Set the title you want
    async function fetchData() {
      if (textToCopy && newSet) {
        try {
          await navigator.clipboard.writeText(textToCopy);

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
  }, [textToCopy, newSet]);

  return (
    <div>
      <div className="flex  gap-2 flex-col  justify-center items-end ">
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
      <div className="mt-5 flex justify-center items-center w-full font-semibold text-slate-400 text-3xl">
        Just focus this page and it will set the text to clipboard
      </div>
    </div>
  );
};

export default ReplaceText;
