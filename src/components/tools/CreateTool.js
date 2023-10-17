const CreateTool = ({ setShowSaveToolForm, setLabel, onSaveTool }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden bg-slate-900 bg-opacity-40 overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  h-screen  flex items-center justify-center ">
      <div
        role="status"
        className="flex items-center justify-center bg-white w-[500px]  p-5 rounded flex flex-col gap-2"
      >
        <textarea
          onChange={(e) => setLabel(e.target.value)}
          rows="3"
          className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tool name"
        ></textarea>
        <div className="flex w-full gap-2 text-center">
          <div
            onClick={() => onSaveTool()}
            className="w-full bg-slate-700 py-1 px-2 cursor-pointer font-semibold text-white rounded"
          >
            Save Tool
          </div>
          <div
            onClick={() => setShowSaveToolForm((prev) => !prev)}
            className="w-full bg-rose-700 py-1 px-2 cursor-pointer font-semibold text-white rounded"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTool;
