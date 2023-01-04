import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:userId" element={<UserDetail />} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
