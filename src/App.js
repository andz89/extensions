import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/Home";
import ReplaceText from "./components/create-tool/ReplaceText";
import AutoCopy from "./components/create-tool/AutoCopy";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/replace-text" element={<ReplaceText />} />
              <Route path="/auto-copy-text" element={<AutoCopy />} />
            </Route>
          </Routes>
        </div>
        ;
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
