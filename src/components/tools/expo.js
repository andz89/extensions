useEffect(() => {
  async function fetchData() {
    if (text && newSet && textToReplace) {
      const text_result = text.replaceAll(textToReplace.trim(), "");
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

async function copy() {
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
}
copy();
